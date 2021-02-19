import { Request, Response } from 'express';

import Totem, { ITotem } from '../models/Totem';

export default {
    async index(req: Request, res: Response) {
        const totemsRepository = Totem;

        const totems = await totemsRepository.find();

        return res.json(totems);
    },

    async show(req: Request, res: Response) {
        const { id } = req.params;

        const totemsRepository = Totem;

        const totem = await totemsRepository.findById(id);

        return res.json(totem);
    },


    async create(req: Request, res: Response) {
        const {
            latitude,
            longitude,
        } = req.body;

        const totem = new Totem({
            latitude,
            longitude,
        });
        console.log(Totem)
        console.log(totem)
        await Totem.save(totem);

        return res.status(201).json(totem);
    }
};
