import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { User } from './user.entity';

@Entity({ name: 't_Shippingaddress' })
export class Address {
  @PrimaryColumn('uuid')
  address_id: string;

  @PrimaryColumn()
  user_id: string;

  @Column()
  address_base: string;

  @Column()
  address_detail: string;

  @ManyToOne(() => User, (user) => user.user_id, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'user_id' })
  user: User;
}
