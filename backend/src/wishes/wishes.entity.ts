import {
  Column, Entity, ManyToOne, OneToMany, CreateDateColumn, UpdateDateColumn, PrimaryGeneratedColumn, type Relation,
} from 'typeorm';

import { Offer } from '../offers/offers.entity.js';
import { User } from '../users/users.entity.js';

@Entity()
export class Wish {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 250 })
  name: string;

  @Column()
  link: string;

  @Column()
  image: string;

  @Column({ type: 'decimal', scale: 2 })
  price: number;

  @Column({ type: 'decimal', scale: 2, default: 0 })
  raised: number;

  @Column({ length: 1024 })
  description: string;

  @Column({ default: 0 })
  copied: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => User, (user) => user.wishes)
  owner: Relation<User>;

  @OneToMany(() => Offer, (offer) => offer.item)
  offers: Relation<Offer[]>;
}
