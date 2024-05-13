import {Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {Vacation} from "./vacation.entity";
import {User} from "./user.entity";


@Entity()
export class Followers {
    @PrimaryGeneratedColumn()
    id: number | undefined;

    @ManyToOne(() => User)
    @JoinColumn({ name: "userId" })
    user: User | undefined;

    @ManyToOne(() => Vacation)
    @JoinColumn({ name: "vacationId" })
    vacation: Vacation | undefined;

}