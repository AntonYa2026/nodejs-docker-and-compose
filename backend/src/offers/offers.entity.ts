import {
  Column, Entity, ManyToOne, CreateDateColumn, UpdateDateColumn, PrimaryGeneratedColumn, type Relation,
} from 'typeorm';

import { User } from '../users/users.entity.js';
import { Wish } from '../wishes/wishes.entity.js';

@Entity()
export class Offer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'decimal', scale: 2 })
  amount: number;

  @Column({ default: false })
  hidden: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => User, (user) => user.offers)
  user: Relation<User>;

  @ManyToOne(() => Wish, (wish) => wish.offers)
  item: Relation<Wish>;
}
