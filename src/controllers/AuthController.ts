import { json, NextFunction, Request, Response } from 'express';
import { compare, hash } from '../utils/hasher';
import { classToPlain } from 'class-transformer';
import jwt from 'jsonwebtoken';
import { isAfter } from 'date-fns';

import User from '../models/User';
import Config from '../utils/config-service';
import EmailService from '../services/email-service';

interface IVerifyObject {
  id: number;
  iat: number;
  exp: number;
}

class AuthController {
  // static async show(request: Request, response: Response): Promise<any> {
  //   const { id } = request.params;
  //   const userRepository = await getRepository(User);

  //   const user = await userRepository.findOneOrFail(id);
  //   return response.json(user);
  // }

  static async login(request: Request, response: Response, next: NextFunction): Promise<any> {
    try {
      const { email, password } = request.body;

      const user = await User.findOne({ email });

      if (!user) {
        throw new Error("User/Password combination not found")
      }

      const passwordValidation = compare(password, user._password);

      if (!passwordValidation) {
        throw new Error("User/Password combination not found")
      }

      const secret = Config.getString('JWT_SECRET');
      const expiresIn = Config.getString('JWT_EXPIRES_IN');

      const token = jwt.sign({ id: user.id }, secret, { expiresIn });

      return response.json({
        ...classToPlain(user, { excludePrefixes: ['_'] }),
        token
      });

    }catch (err) {
      next(err);
    }
  }

  static autorization(request: Request, response: Response, next: NextFunction): void {
    try {
      const header = request.headers.authorization;
      if(!header) {
        throw new Error('No token provided')
      }

      const [_, token] = header.split(' ');
      const secret = Config.getString("JWT_SECRET");

      const result = jwt.verify(token, secret) as IVerifyObject;
      const now = Math.floor(Date.now() / 1000);

      const isExpired = isAfter(now, result.exp)

      if (isExpired) {
        throw new Error('Token expired');
      }

      request.user.id = result.id;
      next();
    } catch(err) {
      next(err);
    }
  }

  static async changePassword(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { oldPassword, password } = request.body;

    const user = await User.findOne({id: Number(id)});

    if (!user) {
      throw new Error("User not found")
    }

    const passwordValidation = compare(oldPassword, user._password);

    if (!passwordValidation) {
      throw new Error("Wrong password");
    }

    user._password = hash(password);

    User.prototype.save(user);

    return response.status(200);
  }

  static async forgotPassword(request: Request, response: Response): Promise<Response> {
    const { email } = request.body;


    const user = await User.findOne({ email });

    if (!user) {
      throw new Error('Email not found');
    }

    const secret = Config.getString('JWT_SECRET');
    const token = jwt.sign({ id: user.id }, secret, { expiresIn: '1h' });

    await EmailService.sendMail({
      user,
      options: {
        type: 'forgot',
        token
      }
    });

    return response.status(200).send();
  }

  static async recoverPassword(request: Request, response: Response): Promise<Response> {
    const { token, password } = request.body;

    const secret = Config.getString('JWT_SECRET');

    const result = jwt.verify(token, secret) as IVerifyObject;
    const now = Math.floor(Date.now() / 1000);

    const isExpired = isAfter(now, result.exp)

    if (isExpired) {
      throw new Error('Token expired');
    }


    const user = await User.findOne({id: Number(result.id)});

    if (!user) {
      throw new Error('User not found');
    }

    user._password = hash(password);
    await User.save(user);

    return response.status(200).send();
  }
}

export default AuthController;
