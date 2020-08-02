import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  JoinTable,
  JoinColumn,
  BaseEntity,
} from 'typeorm';
import { User } from './../user/user.entity';
import { ConnectionRoom } from './../connection/connection.entity';

@Entity('rooms')
export class Room extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @OneToMany(
    type => ConnectionRoom,
    connection => connection.room,
    { eager: true },
  )
  connections: ConnectionRoom[];
}
