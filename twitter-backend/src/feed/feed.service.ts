import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Follow } from 'src/follows/entity/follows.entity';
import { Tweets } from 'src/tweet/entity/tweets.entity';
import { In } from 'typeorm'
import { Repository } from 'typeorm';

@Injectable()
export class FeedService {
    constructor(
        //private userSerivce: UsersService,
        @InjectRepository(Follow)
        private followRepo: Repository<Follow>,
        
        @InjectRepository(Tweets)
        private tweetRepo: Repository<Tweets>

    ){}

    async getFeed(userId: number, page: number, limit: number){
        const followings = await this.followRepo.find({
            where: {followerId: {id: userId}},
            relations: ['followingId']
        })

        const followingIds = followings.map(f => f.followingId.id)

        if(followingIds.length === 0) return []

        const tweets = await this.tweetRepo.find({

            where: [
                { user: { id: In(followingIds)} },
                { user: { id: userId}}
            ],

            relations: {
                user: true,
                comments: {
                    user: true
                },
                likes: {
                    user: true
                },
            },

            order: { createdAt: 'DESC' },

            skip: (page - 1) * limit,
            take: limit
        }) 

        return tweets
    }
}
