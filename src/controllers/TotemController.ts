import { Request, Response } from "express";
import totemView from "../views/totems_views";
import * as Yup from "yup";

import Totem from '../models/Totem';

export default {
  async index(req: Request, res: Response) {
    const totems = await Totem.find();

    return res.json(totemView.renderMany(totems));
  },

  async show(req: Request, res: Response) {
    const { id } = req.params;

    await Totem.findById(id)
    .then(totem => {
      res.send(totem);
    })
    // const totem = await Totem.findById(id)

    // return res.json(totemView.render(totem));
  },

  async create(req: Request, res: Response) {
    const { name, latitude, longitude } = req.body;

    const data = {
      name,
      latitude,
      longitude,
    };

    const schema = Yup.object().shape({
      name: Yup.string().required("Nome é um campo obrigatório"),
      latitude: Yup.number().required("Latitude é um campo obrigatório"),
      longitude: Yup.number().required("Longitude é um campo obrigatório"),
    });

    await schema.validate(data, {
      abortEarly: false,
    });

    const totem = await Totem.create(data);
    return res.status(201).json(totem);
  },

  async delete(req: Request, res: Response) {
    const { id } = req.params;
    
    await Totem.findByIdAndDelete(id);

    res.json({ msg: "Totem removed" })    
  }
};
