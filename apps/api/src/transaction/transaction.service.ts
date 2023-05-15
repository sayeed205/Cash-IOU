import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Query } from 'express-serve-static-core';
import { Model, ObjectId } from 'mongoose';

import { createTransactionDto, updateTransactionDto } from './dto';
import { Transaction } from './schemas/transaction.schema';

@Injectable()
export class TransactionService {
    constructor(
        @InjectModel(Transaction.name)
        private readonly transactionModel: Model<Transaction>,
    ) {}

    async findAll(query: Query): Promise<Transaction[]> {
        console.log(query); // TODO)) add pagination after defining the user schema only give transactions of a room
        return await this.transactionModel.find();
    }

    async createTransaction(transactionInfo: {
        id: ObjectId;
        transaction: createTransactionDto;
    }) {
        const { id, transaction } = transactionInfo;
        const newTransaction = await this.transactionModel.create({
            ...transaction,
            addedBy: id,
        });
        return newTransaction;
    }

    async getTransaction(id: ObjectId): Promise<Transaction> {
        const transaction = await this.transactionModel.findById(id);
        if (!transaction)
            throw new NotFoundException("Transaction doesn't exist!");
        return transaction;
    }

    async updateTransaction(
        id: ObjectId,
        transaction: updateTransactionDto,
    ): Promise<Transaction> {
        const updatedTransaction =
            await this.transactionModel.findByIdAndUpdate(id, transaction, {
                new: true,
            });

        if (!updatedTransaction)
            throw new NotFoundException("Transaction doesn't exist!");
        return updatedTransaction;
    }

    async deleteTransaction(id: ObjectId): Promise<Transaction> {
        const deletedTransaction =
            await this.transactionModel.findByIdAndDelete(id);

        if (!deletedTransaction)
            throw new NotFoundException("Transaction doesn't exist!");
        return deletedTransaction;
    }
}
