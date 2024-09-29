import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserRole } from '../type/role.const';

@Entity()
export class User {
  @PrimaryColumn({ unique: true, type: 'bigint' })
  id: number;

  @Column()
  first_name: string;

  @Column({ default: null })
  username: string;

  @Column({ type: 'double precision', default: 0 })
  balance: number;

  @Column({ type: 'json', default: '{}' })
  options: Record<string, any>;

  @Column({ default: false })
  banned: boolean;

  @CreateDateColumn({ type: 'time with time zone' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'time with time zone' })
  updateAt: Date;

  @Column({ default: false })
  registrated: boolean;

  @Column({ type: 'varchar', default: UserRole.USER })
  role: UserRole;
}
