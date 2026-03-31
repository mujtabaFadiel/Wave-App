import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { TweetModule } from './tweet/tweet.module';
import { CommentsModule } from './comments/comments.module';
import { LikeModule } from './like/like.module';
import { FollowsModule } from './follows/follows.module';
import { FeedModule } from './feed/feed.module';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, 
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_DATABASE'),
        autoLoadEntities: true,
        synchronize: true, 
      }),
    }),
    UsersModule,
    AuthModule,
    TweetModule,
    CommentsModule,
    LikeModule,
    FollowsModule,
    FeedModule,
    ]
})
export class AppModule {}
