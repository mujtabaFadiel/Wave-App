import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Follow } from './entity/follows.entity';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class FollowsService {
    constructor(
        @InjectRepository(Follow)
        private followRepo: Repository<Follow>,
        private userService: UsersService) { }


    async followUser(followerId: number, followingId: number) {
        // prevent follow your self
        if (followerId === followingId)
            throw new BadRequestException("You can not follow yourself")

        // check existing user
        const user = await this.userService.getUserByID(followingId)

        if (!user) throw new NotFoundException("User not found")

        //  cant follow user aleardy following   
        const alreadyFollowing = await this.followRepo.findOneBy({
            followerId: { id: followerId },
            followingId: { id: followingId }
        })

        if (alreadyFollowing) return { message: "AleradyFollowing" }

        const follow = await this.followRepo.create({
            followerId: { id: followerId },
            followingId: { id: followingId }
        })

        return this.followRepo.save(follow)
    }



    async unfollow(followerId: number, followingId: number) {

        if (followerId === followingId)
            throw new BadRequestException("You can not unfollow yourself")

        const user = await this.userService.getUserByID(followingId)

        if (!user)
            throw new NotFoundException("User not found")

        const unfollowedUser = await this.followRepo.findOne({
            where: {
                followerId: { id: followerId },
                followingId: { id: followingId },
            },
            relations: ['followerId', 'followingId']
        })

        console.log(unfollowedUser)

        if (unfollowedUser) return await this.followRepo.delete(unfollowedUser)

    }

    async getUsersWithFollowStatus (currentUserId: number) {
        
        const targetUsers = await this.userService.getAllUsers()

        const following = await this.followRepo.find({
            where: {followerId: {id: currentUserId}},
            relations: ['followingId']
        })

        const followingIds = following.map(f => f.followingId.id) 

        const finalUsers = targetUsers.map(user => {
            return {
                ...user,
                isFollowing: followingIds.includes(user.id)
            }
        })
        return finalUsers
    }   
}
