import { ConnectionRoom } from './../connection/connection.entity';

export interface IJwtPayload {
  id: string;
  username: string;
  connection: ConnectionRoom;
  iat?: Date;
}
