import { PartialType } from '@nestjs/mapped-types'
import { TweetDto } from './tweet.dto';

export class UpdateTweetDto extends PartialType(TweetDto) {

}