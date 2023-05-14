import {
    IsNotEmpty,
    IsPhoneNumber,
    IsString,
    IsStrongPassword,
} from 'class-validator';

export class SignupDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    @IsPhoneNumber()
    phone: string;

    @IsNotEmpty()
    @IsStrongPassword()
    password: string;
}
