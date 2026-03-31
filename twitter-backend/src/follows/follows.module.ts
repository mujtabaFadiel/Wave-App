import { Module } from '@nestjs/common';
import { FollowsService } from './follows.service';
import { FollowsController } from './follows.controller';
import { Follow } from './entity/follows.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from 'src/users/users.module';

@Module({
  providers: [FollowsService],
  controllers: [FollowsController],
  imports: [UsersModule, TypeOrmModule.forFeature([Follow])],
})
export class FollowsModule {}
