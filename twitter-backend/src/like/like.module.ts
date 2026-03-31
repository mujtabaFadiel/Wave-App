import { Module } from '@nestjs/common';
import { LikeService } from './like.service';
import { LikeController } from './like.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Likes } from './entites/like.entity';
import { TweetModule } from 'src/tweet/tweet.module';
import { Tweets } from 'src/tweet/entity/tweets.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([Likes, Tweets]),
        TweetModule
    ],
    providers: [LikeService],
    controllers: [LikeController],
})
export class LikeModule {}
