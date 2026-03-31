import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TweetService } from 'src/tweet/tweet.service';
import { Likes } from './entites/like.entity';
import { Repository } from 'typeorm';
import { Tweets } from 'src/tweet/entity/tweets.entity';

@Injectable()
export class LikeService {
    constructor(
        private tweetSerivce: TweetService,
        @InjectRepository(Likes)
        private likeRepo: Repository<Likes>,
        @InjectRepository(Tweets)
        private tweetRepo: Repository<Tweets>
    ) { }

    async likeTweet(tweetId: number, userId: number) {
        const tweet = await this.tweetSerivce.getTweetByID(tweetId)

        if (!tweet) {
            throw new NotFoundException("tweet Not Found")
        }

        const likeExist = await this.likeRepo.findOne({
            where: {
                tweet: { id: tweetId },
                user: { id: userId }
            }
        })

        if (likeExist) {
            await this.likeRepo.remove(likeExist)
            return { like: 'Unlike' }
        }

        const like = await this.likeRepo.create({
            tweet: { id: tweetId },
            user: { id: userId },
        })

        return await this.likeRepo.save(like)
    }

    async checkIsLiked(userId: number) {
        const tweets = await this.tweetRepo.find({
            where: {user: {id: userId}},
            relations: {
                likes: true, 
                user:true
            }
        })

        const likes = await this.likeRepo.find({
            where: {
                user: { id: userId }
            },
            relations: {user: true, tweet: true}
        })

        const likedTweetIds = likes.map(like => like.tweet.id)

        const result = tweets.map(tweet => ({
            ...tweet,
            isLiked: likedTweetIds.includes(tweet.id)
        }))
        // console.log('USER:', userId)
        // console.log('TWEETS:', tweets.length)
        // console.log('LIKES:', likes.length)
        return result
    }

    async getAllLikes(tweetId: number) {
        const likes = await this.likeRepo.count({
            where: { tweet: { id: tweetId } }
        })

        //const likesCount = likes.length

        return likes
    }
}
