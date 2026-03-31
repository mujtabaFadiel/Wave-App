import { Controller, Delete, Get, Param, ParseIntPipe, Post, Req, UseGuards } from '@nestjs/common';
import { FollowsService } from './follows.service';
import { AuthGuard } from '@nestjs/passport';
import { UsersService } from 'src/users/users.service';

@UseGuards(AuthGuard('jwt'))
@Controller('follows')
export class FollowsController {
    constructor(
        private followsService: FollowsService,
        private usersService: UsersService
    ){}

    @Post('/:followingId')
    async followUser(
        @Param('followingId', ParseIntPipe) followingId,
        @Req() req
    ){
        return await this.followsService.followUser(req.user.id, followingId)
    }

    @Delete('/:followingId')
    async unfollow(
        @Param('followingId', ParseIntPipe) followingId,
        @Req() req
    ){
        return this.followsService.unfollow(req.user.id, followingId)
    }

    @Get('isFollowing')
    async isFollowing (@Req() req)  {
        const currentUser = req.user.id

        return await this.followsService.getUsersWithFollowStatus(currentUser)
    }
}
