import { Comments } from "src/comments/entity/comments.entity";
import { Likes } from "src/like/entites/like.entity";
import { User } from "src/users/entity/User";
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Tweets {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    content: string;

    @ManyToOne(() => User, user => user.tweets, { onDelete: 'CASCADE' })
    user: User;

    @OneToMany(() => Comments, comment => comment.tweet)
    comments: Comments[]

    @OneToMany(() => Likes, like => like.tweet)
    likes: Likes[]

    @CreateDateColumn()
    createdAt: Date;
}