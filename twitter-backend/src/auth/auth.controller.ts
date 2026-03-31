import { Get, Body, Controller, Post, UseGuards, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService
    ){}

    // localhost/auth/login
    @Post('login')
    async login(@Body() loginDto: LoginDto) {
        return this.authService.login(loginDto)
    }

    // /auth/refresh
    @Post('refresh')
    async refresh(@Body('refreshToken') refreshToken: string) {
        return await this.authService.refresh(refreshToken);
    }

    // auth/me
    @UseGuards(AuthGuard('jwt'))
    @Get('/me')
    async getUser(@Req() req) {
        return this.authService.getUser(req.user.id)
    }
}
