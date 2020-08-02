import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './../user/user.entity';
import { Room } from './../room/room.entity';
import { Repository } from 'typeorm';
import {
  NewConnectionToClientDto,
  NewConnectionToServerDto,
  UserReadDto,
} from './dto';
import { ConnectionRoom } from './connection.entity';

@Injectable()
export class ConnectionService {
  constructor(
    @InjectRepository(ConnectionRoom)
    private connectionRepository: Repository<ConnectionRoom>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Room)
    private roomRepository: Repository<Room>,
  ) {}

  async createConnection(
    data: NewConnectionToServerDto,
  ): Promise<ConnectionRoom> {
    const { connectionId, roomId, user } = data;

    const room = await this.roomRepository.findOne({
      where: { id: roomId },
    });
    if (!room) {
      throw new NotFoundException();
    }

    const newConnection = new ConnectionRoom();
    newConnection.id = connectionId;
    newConnection.room = room;
    newConnection.user = user;
    if (room.connections.length == 0) {
      newConnection.isAdmin = true;
    }

    return this.connectionRepository.save(newConnection);
  }

  async deleteConnection(connectionId: string) {
    this.connectionRepository.delete(connectionId);
  }
}
