import { Tweets } from "src/tweet/entity/tweets.entity";
import { User } from "src/users/entity/User";
import { Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Likes{
    @PrimaryGeneratedColumn()
    id: number

    @ManyToOne(() => User, user => user.likes, { onDelete: 'CASCADE' })
    user: User
    
    @ManyToOne(() => Tweets, tweet => tweet.likes, { onDelete: 'CASCADE' })
    tweet: Tweets
}