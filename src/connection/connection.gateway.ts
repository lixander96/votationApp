import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
import { NewConnectionToServerDto, NewConnectionToClientDto } from './dto';
import { ConnectionService } from './connection.service';
import { promises } from 'dns';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { WsJwtGuard } from './../auth/ws-jwt.guard';

@WebSocketGateway({ namespace: 'connection' })
export class ConnectionGateway implements OnGatewayDisconnect {
  constructor(private userService: ConnectionService) {}

  @WebSocketServer() wss: Server;

  handleDisconnect(client: Socket) {
    this.userService.deleteConnection(client.id);
  }

  @UseGuards(WsJwtGuard)
  @SubscribeMessage('newConnectionToServer')
  async newConnection(client: Socket, data: NewConnectionToServerDto) {
    data.connectionId = client.id;
    const newConnection = await this.userService.createConnection(data);

    client.join(newConnection.room.id);

    client.emit('newConnectionToClient', newConnection);
    this.wss.to(newConnection.room.id).emit('');
  }
}
