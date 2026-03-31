import { IsInt, IsNotEmpty, IsString } from "class-validator";

export class TweetDto {
    @IsNotEmpty()
    content: string;
}