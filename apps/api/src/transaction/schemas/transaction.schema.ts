import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
// import { Schema as MongooseSchema, ObjectId } from 'mongoose';
import * as mongoose from 'mongoose';

import { User } from 'src/auth/schemas/user.schema';
import { TransactionRoom } from 'src/transaction-room/schemas/transaction-room.schema';

export enum TransactionType {
    Credit = 'credit',
    Debit = 'debit',
}

@Schema({ timestamps: true })
export class Transaction {
    @Prop({
        required: true,
        type: mongoose.Schema.Types.ObjectId,
        ref: TransactionRoom.name,
    })
    roomId: mongoose.Schema.Types.ObjectId;

    @Prop({ required: true })
    type: TransactionType;

    @Prop({ required: true })
    amount: number;

    @Prop()
    note: string;

    @Prop()
    date: Date;
    @Prop({ ref: User.name, type: mongoose.Schema.Types.ObjectId })
    addedBy: mongoose.Schema.Types.ObjectId;

    @Prop({ default: false })
    isDeleted: boolean;

    @Prop({ ref: User.name, type: mongoose.Schema.Types.ObjectId })
    deletedBy: mongoose.Schema.Types.ObjectId;
}

export const TransactionSchema = SchemaFactory.createForClass(Transaction);
