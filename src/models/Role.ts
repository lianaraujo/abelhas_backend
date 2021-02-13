import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('roles')
export default class Role {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  name: string;
}