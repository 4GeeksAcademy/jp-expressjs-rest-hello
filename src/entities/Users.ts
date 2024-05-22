import {
  Entity, Column, PrimaryGeneratedColumn, 
  BaseEntity, JoinTable, OneToMany,
} from 'typeorm';
import { Favorites } from './Favorites';

@Entity()
export class Users extends BaseEntity{
  @PrimaryGeneratedColumn()
  user_id: number;

  @Column()
  first_name: string;

  @Column()
  last_name: string;

  @Column({unique: true})
  email: string;

  @Column()
  password: string;


  @OneToMany(() => Favorites, favorite => favorite.users)
  favorites: Favorites[];
}