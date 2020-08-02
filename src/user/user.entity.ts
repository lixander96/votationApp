import {
  Entity,
  PrimaryColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
  JoinTable,
  PrimaryGeneratedColumn,
  OneToOne,
  BaseEntity,
} from 'typeorm';
import { Room } from './../room/room.entity';
import { ConnectionRoom } from './../connection/connection.entity';

@Entity('users')
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  username: string;

  @Column()
  password: string;

  @OneToOne(
    type => ConnectionRoom,
    connection => connection.user,
  )
  connection: ConnectionRoom;

  @CreateDateColumn({ name: 'created_name', type: 'timestamp' })
  createdDate: Date;
}
