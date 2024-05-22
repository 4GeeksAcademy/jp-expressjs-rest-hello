import {
  Entity, Column, PrimaryGeneratedColumn, 
  BaseEntity, JoinTable,
  ManyToOne
} from 'typeorm';
import { Users } from './Users';
import { Planets } from './Planets';
import { People } from './People';

@Entity()
export class Favorites extends BaseEntity{
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Users, user => user.favorites)
  users: Users;

  @ManyToOne(() => Planets, {nullable: true})
  planets: Planets;

  @ManyToOne(() => People, {nullable: true})
  people: People;
}