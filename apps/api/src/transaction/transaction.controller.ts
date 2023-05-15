import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
    Query,
    Req,
    UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { Types } from 'mongoose';

import { User } from 'src/auth/schemas/user.schema';
import { ValidateMongoId } from 'src/pipes';
import {
    TransactionQueryDto,
    createTransactionDto,
    updateTransactionDto,
} from './dto';
import { TransactionService } from './transaction.service';

@Controller('transactions')
export class TransactionController {
    constructor(private readonly transactionService: TransactionService) {}

    @Get()
    @UseGuards(AuthGuard())
    async getAllTransaction(
        @Query()
        query: // new ValidationPipe({
        //     transform: true,
        //     forbidNonWhitelisted: true,
        //     transformOptions: { enableImplicitConversion: true },
        // }),
        TransactionQueryDto,
    ) {
        return await this.transactionService.findAll(query); // TODO)) add pagination after defining the user schema
    }

    @Post()
    @UseGuards(AuthGuard())
    async createTransaction(
        @Body()
        transaction: createTransactionDto,
        @Req()
        req: Request,
    ) {
        const { id } = req.user as User;
        return await this.transactionService.createTransaction({
            transaction,
            id,
        });
    }

    @Get(':id')
    async getTransaction(
        @Param('id', ValidateMongoId)
        id: Types.ObjectId,
    ) {
        return await this.transactionService.getTransaction(id);
    }

    @Patch(':id')
    async updateTransaction(
        @Param('id', ValidateMongoId)
        id: Types.ObjectId,
        @Body()
        transaction: updateTransactionDto,
    ) {
        return await this.transactionService.updateTransaction(id, transaction);
    }

    @Delete(':id')
    async deleteTransaction(
        @Param('id', ValidateMongoId)
        id: Types.ObjectId,
    ) {
        return await this.transactionService.deleteTransaction(id);
    }
}
