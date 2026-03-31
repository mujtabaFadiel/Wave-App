import { Tweets } from "src/tweet/entity/tweets.entity";
import { User } from "src/users/entity/User";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Comments {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    content: string

    @ManyToOne(() => User, user => user.comments, {onDelete:'CASCADE'})
    user: User

    @ManyToOne(() => Tweets, tweet => tweet.comments, {onDelete:'CASCADE'})
    tweet: Tweets

    @CreateDateColumn()
    createdAt: Date
}