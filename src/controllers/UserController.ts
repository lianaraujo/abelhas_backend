import { NextFunction, Request, Response } from "express";

import User from "../models/User";
import { hash } from "../utils/hasher";
import { classToPlain } from "class-transformer";

interface IResponse {
  email: string;
  role: {
    id: number;
    name: string;
  };
}

class UserController {
  static async index(request: Request, response: Response, next: NextFunction): Promise<Response | undefined> {
    try {
      const users = await User.find();

      return response.json(users);
    }catch(err) {
      next(err);
    }
  }

  static async show(request: Request, response: Response, next: NextFunction): Promise<any> {
    try {
      const { id } = request.params;
  
      const user = await User.findById(id);
      return response.json(classToPlain(user, { excludePrefixes: ["_"] }));

    }catch(error) {
      next(error);
    }
  }

  static async create(
    request: Request,
    response: Response,
    next: NextFunction,
  ): Promise<Response<IResponse> | undefined> {
    try {
      const { name, email, password, role } = request.body;
      const _password = hash(password);
      
      const isEmailUnique = await User.findOne({ email });
      if (isEmailUnique) {
        throw new Error('Email already used');
      }
  
      const user = await User.create({ name, email, _password, role });
  
      return response.send(user);
      
    }catch(error) {
      next(error);
    }
  }
}

export default UserController;
