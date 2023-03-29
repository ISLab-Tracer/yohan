import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity({ name: 't_book' })
export class Book {
  @PrimaryColumn()
  book_id: number;

  @Column()
  book_title: string;

  @Column()
  book_qty: number;

  @Column()
  book_price: number;

  @Column()
  book_desc: string;

  @Column()
  book_img: string;

  @Column()
  t_bookcol: string;
}
