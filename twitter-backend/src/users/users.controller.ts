import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateUserDto } from './Dto/user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) {}

    //localhost/users/register
    @Post('register')
    async createUser(@Body() userDto: CreateUserDto) {
        return await this.usersService.createUSer(userDto)
    }

    @Get()
    async getAllUsers() {
        return this.usersService.getAllUsers()
    }

    @Get(':id')
    async getUser(@Param('id') id: number) {
        return this.usersService.getUserByID(id)
    }
}
