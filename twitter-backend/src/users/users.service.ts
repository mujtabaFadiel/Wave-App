import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entity/User';
import { Repository } from 'typeorm';
import { CreateUserDto } from './Dto/user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private userRepo: Repository<User>
    ) { }

    async createUSer(userDto: CreateUserDto) {

        const existingEmail = await this.userRepo.findOne({
            where: { email: userDto.email }
        })

        if (existingEmail)
            throw new ConflictException("This email already exists")

        const hashedPassword = await bcrypt.hash(userDto.password, 10)

        const user = await this.userRepo.create({
            //name: userDto.name,
            username: userDto.username,
            email: userDto.email,
            password: hashedPassword
        })

        return this.userRepo.save(user)
    }

    async getAllUsers() {
        return await this.userRepo.find()
    }

    async getUserByID(id: number) {
        return await this.userRepo.findOne({
            where: { id: id },
            relations: {
                tweets: {
                    user: true,        
                    likes: {           
                        user: true     
                    },
                    comments: {        
                        user: true     
                    }
                }
            },
            order: {
                tweets: {
                    createdAt: 'DESC' 
                }
            }
        })
    }

    async getUserByEmail(email) {
        return await this.userRepo.findOne({ where: { email } })
    }
}
