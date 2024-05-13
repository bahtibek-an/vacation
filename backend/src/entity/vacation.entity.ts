import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import { Followers } from "./followers.entity";

@Entity()
export class Vacation {
    @PrimaryGeneratedColumn()
    id: number | undefined;

    @Column({type: 'varchar', length: 255})
    destination: string | undefined;

    @Column({type: 'text'})
    description: string | undefined;

    @Column({type: "decimal"})
    price: number | undefined;

    @Column({type: 'text'})
    picture: string | undefined;

    @Column({type: 'date'})
    start_date: Date | undefined;

    @Column({type: 'date'})
    end_date: Date | undefined;

    @OneToMany(() => Followers, followers => followers.vacation, {
        cascade: true,
        onDelete: "CASCADE"
    })
    followers: Followers[];
}