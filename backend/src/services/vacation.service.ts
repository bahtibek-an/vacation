import {Repository, UpdateResult} from "typeorm";
import {AppDataSource} from "../config/db.config";
import {Vacation} from "../entity/vacation.entity";
import {CreateVacationDTO} from "../dto/vacation.dto";
import {User} from "../entity/user.entity";
import {Followers} from "../entity/followers.entity";
import ApiError from "../exceptions/api.error.exception";

class VacationService {
    vacationRepository: Repository<Vacation> = AppDataSource.getRepository(Vacation);
    userRepository: Repository<User> = AppDataSource.getRepository(User);
    followersRepository: Repository<Followers> = AppDataSource.getRepository(Followers);

    async getAllVacations(host: string, userId?: number | null, follow?: boolean, upcoming?: boolean, active?: boolean, limit?: number, offset?: number) {
        let query = this.vacationRepository.createQueryBuilder("vacation");

        query = query.leftJoinAndMapMany("vacation.followers", Followers, "follower", "follower.vacationId = vacation.id");

        if(follow) {
            query = query.
                leftJoinAndSelect("vacation.followers", "followers")
                .where("followers.userId = :userId", { userId });
        }

        if(upcoming) {
            query = query.andWhere("vacation.start_date > CURRENT_TIMESTAMP");
        }

        if(active) {
            query = query.andWhere("vacation.start_date <= CURRENT_TIMESTAMP AND vacation.end_date >= CURRENT_TIMESTAMP");
        }

        query = query.offset(offset).limit(limit);
        query = query.orderBy("vacation.start_date", "ASC");

        const [vacations, total] = await query.getManyAndCount();
        for (const vacation of vacations as any) {
            if(vacation.picture) {
                vacation.picture = `${host}${vacation.picture}`;
            }
            if(userId) {
                vacation.is_following = (await this.isUserFollowingVacation(userId, vacation.id)) != null;
            }
            vacation.followers_count = vacation.followers.length;
        }
        return { data: vacations, total: total };
    }

    async getVacationById(vacationId: number) {
        const vacation = await this.vacationRepository.findOneBy({ id: vacationId });
        if(!vacation) {
            throw ApiError.NotFoundError();
        }
        return vacation;
    }

    async createVacation(createVacation: CreateVacationDTO): Promise<Vacation> {
        return await this.vacationRepository.save(createVacation);
    }

    async updateVacation(vacationId: string, updateVacation: Partial<CreateVacationDTO>): Promise<UpdateResult> {
        // const vacation = await this.vacationRepository.findOneBy({ id: +vacationId });
        // if (!vacation) {
        //     throw ApiError.NotFoundError();
        // }
        // this.vacationRepository.merge(vacation, updateVacation);
        // return await this.userRepository.save(vacation);
        const vacation = await this.vacationRepository.update(
            vacationId,
            updateVacation
        );
        return vacation;
    }

    async deleteVacation(id: string) {
        await this.followersRepository.createQueryBuilder()
            .delete()
            .from(Followers)
            .where("vacationId = :id", { id })
            .execute();
        return await this.vacationRepository.delete(id);
    }

    async followToVacation(userId: number, vacationId: number) {
        const user = await this.userRepository.findOneBy({ id: userId });
        const vacation = await this.vacationRepository.findOneBy({ id: vacationId });
        if(!user || !vacation) {
            throw ApiError.NotFoundError();
        }

        const follower = new Followers();
        follower.user = user;
        follower.vacation = vacation;

        return await this.followersRepository.save(follower);
    }

    async unfollowFromVacation(userId: number, vacationId: number) {
        const follower = await this.followersRepository.findOneBy({
            user: { id: userId },
            vacation: { id: vacationId }
        });
        if(!follower) {
            throw ApiError.NotFoundError();
        }
        return await this.followersRepository.remove(follower);
    }

    async isUserFollowingVacation(userId: number, vacationId: number) {
        return await this.followersRepository.findOneBy({
            user: {id: userId},
            vacation: {id: vacationId}
        });
    }

    async getVacationsWithFollowersCount() {
        const vacationsWithFollowers = await this.vacationRepository.find({
            relations: ["followers"]
        });
    
        const reportData = vacationsWithFollowers.map(vacation => ({
            destination: vacation.destination,
            followersCount: vacation.followers.length
        }));

        return reportData;
    }
}

export default VacationService;
