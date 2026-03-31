import { User } from "src/users/entity/User";
import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, PrimaryGeneratedColumn, Unique } from "typeorm";

@Entity()
//منع التكرار عدم السماح لشخص متابعة نفس المستخدم مرتين
@Unique(['followerId', 'followingId']) 
export class Follow {
    @PrimaryGeneratedColumn()
    id: number


    @ManyToOne(() => User, user => user.followers, { onDelete: 'CASCADE' })
    followerId: User

    @ManyToOne(() => User, user => user.following, { onDelete: 'CASCADE' })
    followingId: User

}