import { IsNotEmpty, IsPhoneNumber } from 'class-validator';

export class createTransactionRoomDto {
    @IsNotEmpty()
    readonly name: string;

    @IsNotEmpty()
    @IsPhoneNumber()
    readonly phone: string;
}
