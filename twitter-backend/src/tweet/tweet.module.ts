import { Module } from '@nestjs/common';
import { TweetService } from './tweet.service';
import { TweetController } from './tweet.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tweets } from './entity/tweets.entity';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [TypeOrmModule.forFeature([Tweets]), UsersModule],
  exports: [TweetService],
  providers: [TweetService],
  controllers: [TweetController]
})
export class TweetModule {}
