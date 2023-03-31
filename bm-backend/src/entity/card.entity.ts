import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { User } from './user.entity';

@Entity({ name: 't_card' })
export class Card {
  @PrimaryColumn()
  card_id: string;

  @PrimaryColumn()
  user_id: string;

  @Column()
  card_date: string;

  @Column()
  card_kind: string;

  @ManyToOne(() => User, (user) => user.user_id, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'user_id' })
  user: User;
}
