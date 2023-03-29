import { ManyToOne, JoinColumn, Entity, PrimaryColumn } from 'typeorm';
import { User } from './user.entity';

@Entity({ name: 't_cart' })
export class Cart {
  @PrimaryColumn()
  cart_id: number;

  @PrimaryColumn()
  user_id: string;

  @ManyToOne(() => User, (user) => user.user_id, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'user_id' })
  user: User;
}
