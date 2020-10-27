import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('totems')
export default class Totem {

    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column()
    latitude: number;

    @Column()
    longitude: number;
}