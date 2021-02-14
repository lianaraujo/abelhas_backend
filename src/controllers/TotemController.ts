import { Request, Response } from 'express';

import Totem from '../models/Totem';

export default {
    async index(request: Request, response: Response) {
        const totemsRepository = Totem;

        const totems = await totemsRepository.find();

        return response.json(totems);
    },

    async show(request: Request, response: Response) {
        const { id } = request.params;

        const totemsRepository = Totem;

        const totem = await totemsRepository.findById(id);

        return response.json(totem);
    },


    async create(request: Request, response: Response) {
        const {
            latitude,
            longitude,
        } = request.body;

        const totem = new Totem({
            latitude,
            longitude,
        });

        await Totem.prototype.save(totem);

        return response.status(201).json(totem);
    }
};
