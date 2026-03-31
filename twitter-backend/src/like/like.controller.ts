import { Controller, Get, Param, ParseIntPipe, Post, Req, UseGuards } from '@nestjs/common';
import { LikeService } from './like.service';
import { AuthGuard } from '@nestjs/passport';


@UseGuards(AuthGuard('jwt'))
@Controller('like')
export class LikeController {
    constructor(private likeService: LikeService) {}

    @Post('/:tweetId')
    async likeTweet(
        @Param('tweetId', ParseIntPipe) tweetId,
        @Req() req
    ){
        return await this.likeService.likeTweet(tweetId, req.user.id)
    }

    @Get('/:tweetId')
    async getAllLikes(@Param('tweetId', ParseIntPipe) tweetId){
        return await this.likeService.getAllLikes(tweetId)
    }

    @Get()
    async isLiked(
       @Req() req
    ){
        console.log("User", req.user.id)
        return await this.likeService.checkIsLiked(req.user.id)
    }

}
