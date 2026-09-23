import { Exclude } from 'class-transformer';
import {
  Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn, type Relation,
} from 'typeorm';

import { Offer } from '../offers/offers.entity.js';
import { Wish } from '../wishes/wishes.entity.js';
import { Wishlist } from '../wishlists/wishlists.entity.js';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 64, unique: true })
  username: string;

  @Column({ length: 200, default: 'Пока ничего не рассказал о себе.' })
  about: string;

  @Column({ default: 'https://i.pravatar.cc/300' })
  avatar: string;

  @Column({ unique: true })
  email: string;

  @Column({ select: false })
  @Exclude({ toPlainOnly: true })
  password: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => Wish, (wish) => wish.owner)
  wishes: Relation<Wish[]>;

  @OneToMany(() => Wishlist, (wishlist) => wishlist.owner)
  wishlists: Relation<Wishlist[]>;

  @OneToMany(() => Offer, (offer) => offer.user)
  offers: Relation<Offer[]>;
}
