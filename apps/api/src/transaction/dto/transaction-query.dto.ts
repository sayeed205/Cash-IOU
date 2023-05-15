import { Transform } from 'class-transformer';
import { IsInt, IsNotEmpty, IsString } from 'class-validator';
import { Types } from 'mongoose';
import { IsValidMongoId } from 'src/decorators';

export class TransactionQueryDto {
    @IsNotEmpty()
    @IsValidMongoId()
    @Transform(({ value }) => new Types.ObjectId(value))
    roomId: Types.ObjectId;

    @Transform(({ value }) => parseInt(value))
    @IsInt()
    page: number = 1;

    @Transform(({ value }) => parseInt(value))
    @IsInt()
    limit: number = 10;

    @IsString()
    q: string = '';
}
