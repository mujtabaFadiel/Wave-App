import { Controller, Get, ParseIntPipe, Query, Req, UseGuards } from '@nestjs/common';
import { FeedService } from './feed.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('feed')
export class FeedController {
    constructor( private feedService: FeedService) {}

    @UseGuards(AuthGuard('jwt'))
    @Get()
    async getFeed(
        @Query('page') page:number = 1,
        @Query('limit') limit: number = 10,
        @Req() req 
    ){
        return await this.feedService.getFeed(req.user.id, page, limit)
    }
}
