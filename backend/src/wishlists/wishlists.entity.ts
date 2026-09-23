import {
  Column, CreateDateColumn, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn,
  type Relation,
} from 'typeorm';

import { User } from '../users/users.entity.js';
import { Wish } from '../wishes/wishes.entity.js';

@Entity()
export class Wishlist {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 250 })
  name: string;

  @Column({ length: 1500 })
  description: string;

  @Column()
  image: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => User, (user) => user.wishlists)
  owner: Relation<User>;

  @ManyToMany(() => Wish)
  @JoinTable()
  items: Relation<Wish[]>;
}
