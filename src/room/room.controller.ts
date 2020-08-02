import { Controller, Get, Param, Post } from '@nestjs/common';
import { RoomService } from './room.service';

@Controller('room')
export class RoomController {

    constructor(private roomService: RoomService) {}

    @Get()
    getRooms() {
        return this.roomService.getRooms();
    }

    @Get(':id')
    getRoom(@Param('id') id) {
        return 'get room by id : ' + id;
    }

    @Post()
    creteRoom() {
        return this.roomService.createRoom();
    }
}
