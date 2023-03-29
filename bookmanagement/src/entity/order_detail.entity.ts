import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { Book } from './book.entity';
import { Order } from './order.entity';

@Entity({ name: 't_order_detail' })
export class OrderDetail {
  @PrimaryColumn()
  book_id: number;

  @PrimaryColumn('uuid')
  order_id: number;

  @Column()
  order_qty: number;

  @ManyToOne(() => Book, (book) => book.book_id, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'book_id' })
  book: Book;

  @ManyToOne(() => Order, (order) => order.order_id, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'order_id' })
  order: Order;
}
