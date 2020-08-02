import { Room } from './../../room/room.entity';
import { Exclude, Expose } from 'class-transformer';
import { UserReadDto } from './user-read';

export class NewConnectionToClientDto {
  user: UserReadDto;
  room: Room;
}
