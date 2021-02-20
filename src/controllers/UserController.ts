import { Request, Response } from "express";

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
  static async show(request: Request, response: Response): Promise<any> {
    const { id } = request.params;

    const user = await User.findById(id);
    console.log('sabia do caraio')
    return response.json(classToPlain(user, { excludePrefixes: ["_"] }));
  }

  static async create(
    request: Request,
    response: Response
  ): Promise<Response<IResponse>> {
    const { email, password, role } = request.body;
    const _password = hash(password);

    const user = await User.create({ email, _password, role });

    return response.send(user);
  }
}

export default UserController;
