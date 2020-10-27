import { Request, Response } from 'express';
import { getRepository } from 'typeorm';

import Totem from '../models/Totem';

export default {
    async index(request: Request, response: Response) {
        const totemsRepository = getRepository(Totem);

        const totems = await totemsRepository.find();

        return response.json(totems);
    },

    async show(request: Request, response: Response) {
        const { id } = request.params;

        const totemsRepository = getRepository(Totem);

        const totem = await totemsRepository.findOneOrFail(id);

        return response.json(totem);
    },


    async create(request: Request, response: Response) {
        const {
            latitude,
            longitude,
        } = request.body;

        const totemsRepository = getRepository(Totem);

        const totem = totemsRepository.create({
            latitude,
            longitude,
        });

        await totemsRepository.save(totem);

        return response.status(201).json(totem);
    }
};