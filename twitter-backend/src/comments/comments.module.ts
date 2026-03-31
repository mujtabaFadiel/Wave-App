import { Module } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentsController } from './comments.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comments } from './entity/comments.entity';
import { UsersModule } from 'src/users/users.module';
import { TweetModule } from 'src/tweet/tweet.module';

@Module({
  providers: [CommentsService],
  controllers: [CommentsController],
  imports: [TypeOrmModule.forFeature([Comments]), UsersModule, TweetModule]
})
export class CommentsModule {}
