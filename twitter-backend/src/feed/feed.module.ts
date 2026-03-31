import { Module } from '@nestjs/common';
import { FeedController } from './feed.controller';
import { FeedService } from './feed.service';
import { UsersModule } from 'src/users/users.module';
import { FollowsModule } from 'src/follows/follows.module';
import { TweetModule } from 'src/tweet/tweet.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tweets } from 'src/tweet/entity/tweets.entity';
import { Follow } from 'src/follows/entity/follows.entity';

@Module({
  controllers: [FeedController],
  providers: [FeedService],
  imports: [FollowsModule, 
    TweetModule,
    TypeOrmModule.forFeature([Tweets, Follow]),]
})
export class FeedModule {}
