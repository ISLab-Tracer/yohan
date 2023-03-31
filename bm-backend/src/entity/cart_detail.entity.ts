import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { Book } from './book.entity';
import { Cart } from './cart.entity';

@Entity({ name: 't_cart_detail' })
export class CartDetail {
  @PrimaryColumn()
  cart_id: number;

  @PrimaryColumn()
  book_id: number;

  @Column()
  cart_qty: number;

  @ManyToOne(() => Cart, (cart) => cart.cart_id, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'cart_id' })
  cart: Cart;

  @ManyToOne(() => Book, (book) => book.book_id, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'book_id' })
  book: Book;
}
