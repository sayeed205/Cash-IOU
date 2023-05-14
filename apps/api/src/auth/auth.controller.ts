import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto, SignupDto } from './dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('signup')
    async signup(
        @Body()
        signupInfo: SignupDto,
    ) {
        return this.authService.signUp(signupInfo);
    }

    @Post('login')
    async login(
        @Body()
        loginInfo: LoginDto,
    ) {
        return this.authService.logIn(loginInfo);
    }
}
