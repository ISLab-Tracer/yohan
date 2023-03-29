import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity({ name: 't_user' })
export class User {
  @PrimaryColumn()
  user_id: string;

  @Column()
  user_pw: string;

  @Column()
  user_nm: string;

  @Column()
  user_grade: string;
}
