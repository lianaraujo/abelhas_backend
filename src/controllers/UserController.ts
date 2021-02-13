import { Request, Response } from 'express';
import { getRepository } from 'typeorm';

import User from '../models/User';
import Role from '../models/Role';
import { hash } from '../utils/hasher';
import { classToPlain } from 'class-transformer';

interface IResponse {
  email: string; 
  role: {
    id: number;
    name: string;
  }
}

class UserController {
  static async show(request: Request, response: Response): Promise<any> {
    const { id } = request.params;
    const userRepository = await getRepository(User);
    
    const user = await userRepository.findOneOrFail(id);
    return response.json(classToPlain(user, { excludePrefixes: ['_'] }));
  }

  static async create(request: Request, response: Response): Promise<Response<IResponse>> {
    const { email, password, roleName } = request.body;
    const userRepository = await getRepository(User);
    const roleRepository = await getRepository(Role);

    const role = await roleRepository.findOne({ name: roleName });

    if (!role) {
      throw new Error('Papel do usuário não encontrado');
    }

    const _password = hash(password);

    const user = await userRepository.create({ email, _password, role });
    await userRepository.save(user);

    return response.json(classToPlain(user, { excludePrefixes: ['_'] }));
  }
}

export default UserController;