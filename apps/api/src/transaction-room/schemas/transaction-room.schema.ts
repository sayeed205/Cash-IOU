import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';

@Schema()
class roomDetails {
    @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'User' })
    userId: mongoose.Schema.Types.ObjectId;

    @Prop()
    name: string;

    @Prop()
    avatar?: string;

    // TODO: Add more fields
}

@Schema({ timestamps: true })
export class TransactionRoom {
    @Prop({
        required: true,
        type: [mongoose.Schema.Types.ObjectId],
        validate: {
            validator: function (val: string | any[]) {
                return val.length === 2;
            },
        },
    })
    members: mongoose.Schema.Types.ObjectId[];

    @Prop()
    roomDetails: roomDetails[];
}

export const TransactionRoomSchema =
    SchemaFactory.createForClass(TransactionRoom);
