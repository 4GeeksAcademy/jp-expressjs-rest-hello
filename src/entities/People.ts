import {
  Entity, Column, PrimaryGeneratedColumn, ManyToMany, 
  BaseEntity, JoinTable,
} from 'typeorm';
import { Users } from './Users';

@Entity()
export class People extends BaseEntity{
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  birth_year: string;

  @Column()
  gender: string;

  @Column()
  height: number;


  @ManyToMany(() => Users)
  @JoinTable()
  users: Users[];
}