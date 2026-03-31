import { Body, Controller, Get, Param, ParseIntPipe, Post, Req, UseGuards } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentDto } from './dto/comments.dto';
import { AuthGuard } from '@nestjs/passport';


@UseGuards(AuthGuard('jwt'))
@Controller('comments')
export class CommentsController {
    constructor(private commentService: CommentsService) {}

    @Post()
    async createComment(
        @Body() commentDto: CommentDto,
        @Req() req
    ) {
        return await this.commentService.createComment(commentDto, req.user.id)
    }

    @Get('/tweet/:tweetId')
    async getCommentsByTweetId(@Param('tweetId', ParseIntPipe )tweetId){
        return await this.commentService.getCommentsByTweetId(tweetId)
    }

    @Get('/user/:userId')
    async getCommentsByUserId (@Param('userId', ParseIntPipe) userId: number){
        return await this.commentService.getCommentsByUserId(userId)
    }

    @Get('/:id')
    async getCommentById (@Param('id', ParseIntPipe) id:number) {
        return this.commentService.getCommentById(id)
    }
}
