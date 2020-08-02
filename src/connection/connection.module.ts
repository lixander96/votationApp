import { Module } from '@nestjs/common';
import { ConnectionService } from './connection.service';
import { ConnectionGateway } from './connection.gateway';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Room } from './../room/room.entity';
import { User } from './../user/user.entity';
import { ConnectionRoom } from './connection.entity';
import { AuthModule } from './../auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([ConnectionRoom, Room, User]), AuthModule],
  providers: [ConnectionService, ConnectionGateway],
  exports: [ConnectionModule],
})
export class ConnectionModule {}
