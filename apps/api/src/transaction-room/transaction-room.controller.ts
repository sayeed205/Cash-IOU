import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';

import { User } from 'src/auth/schemas/user.schema';
import { createTransactionRoomDto } from './dto';
import { TransactionRoomService } from './transaction-room.service';

@Controller('transaction-room')
export class TransactionRoomController {
    constructor(
        private readonly transactionRoomService: TransactionRoomService,
    ) {}

    @Post()
    @UseGuards(AuthGuard())
    async createTransactionRoom(
        @Body()
        transactionRoom: createTransactionRoomDto,
        @Req()
        req: Request,
    ) {
        return await this.transactionRoomService.createTransactionRoom({
            user: req.user as User,
            name: transactionRoom.name,
            phone: transactionRoom.phone,
        });
    }

    @Get('all')
    @UseGuards(AuthGuard())
    async getAllTransactionRooms() {}

    @Get(':id')
    @UseGuards(AuthGuard())
    async getTransactionRoom() {}
}
