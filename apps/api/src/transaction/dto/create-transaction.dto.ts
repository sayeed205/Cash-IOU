import {
    IsDateString,
    IsEnum,
    IsMongoId,
    IsNotEmpty,
    IsNumber,
} from 'class-validator';
import { Types } from 'mongoose';
import { TransactionType } from '../schemas/transaction.schema';

export class createTransactionDto {
    @IsNotEmpty()
    @IsMongoId()
    readonly roomId: Types.ObjectId;

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
