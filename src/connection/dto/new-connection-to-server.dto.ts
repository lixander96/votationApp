import { User } from 'src/user/user.entity';

export class NewConnectionToServerDto {
  connectionId: string;

  user: User;

  roomId: string;
}
