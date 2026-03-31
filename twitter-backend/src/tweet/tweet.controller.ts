import { Body, 
    Controller, 
    Delete, 
    Get, 
    Param, 
    ParseIntPipe, 
    Patch, 
    Post, 
    Query, 
    Req, 
    UseGuards } from '@nestjs/common';
import { TweetDto } from './dto/tweet.dto';
import { TweetService } from './tweet.service';
import { AuthGuard } from '@nestjs/passport';
import { UpdateTweetDto } from './dto/updateTweet.dto';

@UseGuards(AuthGuard('jwt'))
@Controller('tweet')
export class TweetController {
    constructor(private tweetService: TweetService){}

    //localhost/tweet
    @Post()
    async createTweet (@Body() tweet: TweetDto, 
    @Req() req: any) {
        return this.tweetService.createTweet(tweet, req.user.id)
    }

    @Get()
    async getAllTweet(
        @Query('page') page = 1, 
        @Query('limit') limit = 10
    ) {
        return await this.tweetService.getAlltweets(page,limit)
    }

    @Get(':id')
    async getTweetByID(@Param('id', ParseIntPipe) id: number) {
        return await this.tweetService.getTweetByID(id)
    }

    @Get('/user/:id')
    async getTweetsByUserId(
        @Param('id', ParseIntPipe) id: number,
        @Query('page') page = 1, 
        @Query('limit') limit = 10
    ) {
        return await this.tweetService.getTweetsByUserId(id, page, limit)
    }

    @Patch(':id')
    async updateTweet(
        @Param('id', ParseIntPipe) id: number,
        @Body() updateTweet: UpdateTweetDto, 
        @Req() req
    ){
        console.log(req.user.id)
        return this.tweetService.updateTweet(id, updateTweet, req.user.id)
    }

    @Delete(':id')
    async deleteTweet(
        @Param('id', ParseIntPipe) id: number,
        @Req() req
    ){
        return this.tweetService.deleteTweet(id, req.user.id)
    }
}
