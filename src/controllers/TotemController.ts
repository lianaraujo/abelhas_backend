import { Request, Response } from 'express';

import Totem from '../models/Totem';

export default {
    async index(req: Request, res: Response) {
        const totemsRepository = Totem;

        const totems = await totemsRepository.find();

        return res.json(totems);
    },

    async show(req: Request, res: Response) {
        const { id } = req.params;

        const totemsRepository = Totem;
        console.log(Totem)

        const totem = await totemsRepository.findById(id);
        console.log(totem)
        console.log(id)

        return res.json(totem);
    },


    async create(req: Request, res: Response) {
        const {
            latitude,
            longitude,
        } = req.body;

        const totem = await Totem.create({
            latitude,
            longitude,
        });
        return res.status(201).json(totem);
    }
};
