import { IsNotEmpty, IsPhoneNumber, IsStrongPassword } from 'class-validator';

export class LoginDto {
    @IsNotEmpty()
    @IsPhoneNumber()
    phone: string;

    @IsNotEmpty()
    @IsStrongPassword()
    password: string;

    // email?:
}
