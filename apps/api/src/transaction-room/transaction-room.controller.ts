import {
    Body,
    Controller,
    Get,
    Param,
    Post,
    Req,
    UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { Types } from 'mongoose';

import { User } from 'src/auth/schemas/user.schema';
import { ValidateMongoId } from 'src/pipes';
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
        const user = req.user as User;
        return await this.transactionRoomService.createTransactionRoom({
            id: user._id,
            name: transactionRoom.name,
            phone: transactionRoom.phone,
        });
    }

    @Get('all')
    @UseGuards(AuthGuard())
    async getAllTransactionRooms(
        @Req()
        req: Request,
    ) {
        const { _id } = req.user as User;
        return await this.transactionRoomService.getAllTransactionRooms(_id);
    }

    @Get(':id')
    @UseGuards(AuthGuard())
    async getTransactionRoom(
        @Param('id', ValidateMongoId)
        id: Types.ObjectId,
    ) {}
}
