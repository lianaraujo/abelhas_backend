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
  static async show(req: Request, res: Response): Promise<any> {
    const { id } = req.params;

    const user = await User.findById(id);
    return res.json(classToPlain(user, { excludePrefixes: ["_"] }));
  }

  static async create(
    req: Request,
    res: Response
  ): Promise<Response<IResponse>> {
    const { email, password, role } = req.body;
    const _password = hash(password);

    const user = await User.create({ email, _password, role });

    return res.send(user);
  }
}

export default UserController;
