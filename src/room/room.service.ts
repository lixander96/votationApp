import { Injectable } from '@nestjs/common';
import { Room } from './room.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { async } from 'rxjs';

@Injectable()
export class RoomService {
  constructor(
    @InjectRepository(Room)
    private roomRepository: Repository<Room>,
  ) {}

  async getRooms() {
    return await this.roomRepository.find();
  }

  async createRoom() {
    const newRoom = new Room();
    return await this.roomRepository.save(newRoom);
  }
}
