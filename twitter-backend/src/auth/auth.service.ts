import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
    constructor(
        private userService: UsersService,
        private jwtService: JwtService,
        private configService: ConfigService
    ) { }

    async login(loginDto: LoginDto) {
        console.log('--- DB Config Check ---');
    console.log('JWT_SECRET from ENV:', this.configService.get('JWT_SECRET'));
    console.log('-----------------------');

        const user = await this.userService.getUserByEmail(loginDto.email)

        if (!user) throw new UnauthorizedException("This Email Not Found")

        const isMatch = await bcrypt.compare(loginDto.password, user.password)

        if (!isMatch) throw new UnauthorizedException("Wrong Password")

        const payload = {
            id: user.id,
            email: user.email
        }

        const secret = this.configService.get<string>('JWT_SECRET');
        const accessExpires = this.configService.get<string>('JWT_ACCESS_EXPIRES_IN');
        const refreshExpires = this.configService.get<string>('JWT_REFRESH_EXPIRES_IN');

        const access_token = this.jwtService.sign(payload, {
            secret: secret,
            expiresIn: accessExpires as any
        })

        const refresh_token = this.jwtService.sign(payload, {
            secret: secret,
            expiresIn: refreshExpires as any
        })

        return {
            message: 'Login Success',
            access_token: access_token,
            refresh_token: refresh_token
        }
    }

    async refresh(token: string) {

        const secret = this.configService.get<string>('JWT_SECRET');
        const accessExpires = this.configService.get<string>('JWT_ACCESS_EXPIRES_IN');

        const payload = await this.jwtService.verify(token, {secret})

        const newAccessToken = this.jwtService.sign(
            { id: payload.id, email: payload.email },
            { secret: secret, expiresIn: accessExpires as any }
        )
        return {
            accessToken: newAccessToken,
        };
    }

    async getUser(userId: number) {
        const user = this.userService.getUserByID(userId)

        if (!user) throw new NotFoundException()

        return user
    }
}
