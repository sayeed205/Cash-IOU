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
import { Query as query } from 'express-serve-static-core';
import { ObjectId } from 'mongoose';

import { User } from 'src/auth/schemas/user.schema';
import { createTransactionDto, updateTransactionDto } from './dto';
import { TransactionService } from './transaction.service';

@Controller('transactions')
export class TransactionController {
    constructor(private readonly transactionService: TransactionService) {}

    @Get()
    @UseGuards(AuthGuard())
    async findAll(
        @Query()
        query: query,
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
        return await this.transactionService.createTransaction({
            transaction,
            user: req.user as User,
        });
    }

    @Get(':id')
    async getTransaction(
        @Param('id')
        id: ObjectId,
    ) {
        return await this.transactionService.getTransaction(id);
    }

    @Patch(':id')
    async updateTransaction(
        @Param('id')
        id: ObjectId,
        @Body()
        transaction: updateTransactionDto,
    ) {
        return await this.transactionService.updateTransaction(id, transaction);
    }

    @Delete(':id')
    async deleteTransaction(
        @Param('id')
        id: ObjectId,
    ) {
        return await this.transactionService.deleteTransaction(id);
    }
}
