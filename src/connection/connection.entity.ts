import {
  Entity,
  PrimaryColumn,
  Column,
  CreateDateColumn,
  JoinColumn,
  OneToOne,
  OneToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  BaseEntity,
} from 'typeorm';
import { Room } from './../room/room.entity';
import { User } from './../user/user.entity';

@Entity('connections')
export class ConnectionRoom extends BaseEntity {
  @PrimaryColumn()
  id: string;

  @ManyToOne(
    type => Room,
    room => room.connections,
  )
  @JoinColumn()
  room: Room;

  @OneToOne(
    type => User,
    user => user.connection,
    { eager: true },
  )
  @JoinColumn()
  user: User;

  @Column({ type: 'boolean', default: false })
  isAdmin: boolean;

  @CreateDateColumn({ name: 'created_name', type: 'timestamp' })
  createdDate: Date;
}
