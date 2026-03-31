import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { TweetDto } from './dto/tweet.dto';
import { UsersService } from 'src/users/users.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Tweets } from './entity/tweets.entity';
import { Repository } from 'typeorm';
import { UpdateTweetDto } from './dto/updateTweet.dto';
import { EmptyError } from 'rxjs';

@Injectable()
export class TweetService {
    constructor(
        @InjectRepository(Tweets)
        private tweetRepo: Repository<Tweets>,
        private userSerivce: UsersService
    ) {}

    async createTweet(tweet: TweetDto, userId) {
        const user = await this.userSerivce.getUserByID(userId)
       
        if(!user) throw new UnauthorizedException('user not found!')

        if(!tweet.content || tweet.content.trim() === "") 
            throw new BadRequestException('Tweet cant be empty')
        
        const createdTweet = await this.tweetRepo.create({
            content: tweet.content,
            user: user
        })

        return this.tweetRepo.save(createdTweet)
    }

    async getAlltweets(page: number, limit: number) {

        const skip = (page - 1) * limit

        return this.tweetRepo.find({ 
            relations: {
                user: true,
                likes: {
                    user: true
                },
                comments: {
                    user: true
                }
            },
            take: limit,
            skip: skip
        })
    }

    async getTweetByID(id: number) {

        return this.tweetRepo.findOne({
            where: {id},
            relations: {
                user: true, 
                likes: true, 
                comments: true
            }
        })
    }

    async getTweetsByUserId(userId: number, page: number, limit: number) {

        const skip = (page - 1) * limit

        const tweets =  await this.tweetRepo.find({
            where: {user: {id : userId}},
            take: limit,
            skip: skip
        })

        return tweets;
    }

    async updateTweet(id: number, updateTweet: UpdateTweetDto, userId: number){
        const tweet = await this.tweetRepo.findOne({
            where: {id, user: {id: userId}},
            relations: {user: true}
        })

        console.log(tweet)

        if(!tweet) throw new NotFoundException('Tweet not found');
        
        tweet && (tweet.content = updateTweet.content ?? tweet.content) 

        return await this.tweetRepo.save(tweet)
    }


    async deleteTweet(id: number, userId) {
        const tweet = await this.tweetRepo.findOne({
            where: {
                id,
                user: {id: userId}
            }
        })

        if(!tweet)throw new NotFoundException('Tweet not found');
        
    await this.tweetRepo.remove(tweet)

    return {
        message: 'tweet deleted'
        }
    }
}
