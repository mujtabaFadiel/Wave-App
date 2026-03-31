import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Comments } from './entity/comments.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CommentDto } from './dto/comments.dto';
import { TweetService } from 'src/tweet/tweet.service';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class CommentsService {
    constructor(
        @InjectRepository(Comments)
        private commentRepo: Repository<Comments>,
        private tweetService: TweetService,
        private userService: UsersService
    ) {}

    async createComment(commentDto: CommentDto, userId) {
        const tweet = await this.tweetService.getTweetByID(commentDto.tweetId)

        if (!tweet) throw new NotFoundException('Tweet not found');
        
        const comment = this.commentRepo.create({
            content: commentDto.content,
            tweet,
            user: {id: userId}
        })

        return this.commentRepo.save(comment);
    }

    async getCommentsByTweetId(tweetId: number){

       const comments = await this.commentRepo.find({
        where: {tweet: {id: tweetId}},
        relations: {user: true}
       })

        return console.log(comments)
    }

    async getCommentsByUserId(userId: number) {
        const comments = await this.commentRepo.find({
            where: {user: {id: userId}}
        })

        return comments
    }

    async getCommentById(commentId:number) {
        return this.commentRepo.findOne({where: {id: commentId}})
    }
}
