import { Exclude } from "class-transformer";
import { IsOptional } from "class-validator";
import { Comments } from "src/comments/entity/comments.entity";
import { Follow } from "src/follows/entity/follows.entity";
import { Likes } from "src/like/entites/like.entity";
import { Tweets } from "src/tweet/entity/tweets.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    username: string;

    @Column()
    email: string;

    @Column()
    @Exclude()
    password: string;


    //@Column()
    //name: string;

    @Column({ nullable: true })
    bio?: string;

    @Column({ nullable: true })
    image?: string;

    @OneToMany(() => Tweets, tweets => tweets.user)
    tweets: Tweets[]

    @OneToMany(() => Comments, comment => comment.user)
    comments: Comments[]

    @OneToMany(() => Likes, likes => likes.user)
    likes: Likes[]

    @OneToMany(() => Follow, follow => follow.followerId)
    followers: Follow[]

    @OneToMany(() => Follow, follow => follow.followingId)
    following: Follow[]
}