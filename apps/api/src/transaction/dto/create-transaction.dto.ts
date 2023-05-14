import { IsDateString, IsEnum, IsNotEmpty, IsNumber } from 'class-validator';
import mongoose from 'mongoose';
import { TransactionType } from '../schemas/transaction.schema';

export class createTransactionDto {
    @IsNotEmpty()
    readonly roomId: mongoose.Schema.Types.ObjectId;

    @IsEnum(TransactionType)
    readonly type: TransactionType;

    @IsNotEmpty()
    @IsNumber()
    readonly amount: number;

    readonly note: string;

    @IsNotEmpty()
    @IsDateString()
    readonly date: Date;
}
