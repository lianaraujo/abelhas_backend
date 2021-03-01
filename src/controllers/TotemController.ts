import { Request, Response } from 'express';

import Totem from '../models/Totem';

export default {
    async index(req: Request, res: Response) {
        const totems = await Totem.find();

        return res.json(totems);
    },

    async show(req: Request, res: Response) {
        const { id } = req.params;

        const totem = await Totem.findById(id);

        return res.json(totem);
    },


    async create(req: Request, res: Response) {
        const {
            name,
            latitude,
            longitude,
        } = req.body;

        const totem = await Totem.create({
            name,
            latitude,
            longitude,
        });
        return res.status(201).json(totem);
    }
};
