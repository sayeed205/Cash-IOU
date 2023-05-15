import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';

@Schema()
class roomDetails {
    @Prop({ required: true, type: Types.ObjectId, ref: 'User' })
    userId: Types.ObjectId;

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
        type: [Types.ObjectId],
        validate: {
            validator: function (val: string | any[]) {
                return val.length === 2;
            },
        },
    })
    members: Types.ObjectId[];

    @Prop({
        validate: {
            validator: function (val: string | any[]) {
                return val.length === 2;
            },
        },
    })
    roomDetails: roomDetails[];
}

export const TransactionRoomSchema =
    SchemaFactory.createForClass(TransactionRoom);
