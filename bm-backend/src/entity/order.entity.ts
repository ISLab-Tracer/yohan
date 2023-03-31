import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { User } from './user.entity';

@Entity({ name: 't_order' })
export class Order {
  @PrimaryColumn()
  order_id: number;

  @PrimaryColumn()
  user_id: string;

  @Column()
  order_date: string;

  @Column()
  order_total: number;

  @ManyToOne(() => User, (user) => user.user_id, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'user_id' })
  user: User;
}
