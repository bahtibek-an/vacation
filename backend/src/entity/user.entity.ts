import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import { Followers } from "./followers.entity";


export enum UserRole {
    USER = "USER",
    ADMIN = "ADMIN"
}

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number | undefined;

    @Column({type: 'varchar', length: 255, unique: true})
    email: string | undefined;

    @Column({type: 'varchar', length: 255})
    firstName: string | undefined;

    @Column({type: 'varchar', length: 255})
    lastName: string | undefined;

    @Column({type: 'varchar', length: 255})
    password: string | undefined;

    @Column({
        type: 'enum',
        enum: UserRole,
        default: UserRole.USER,
    })
    role: UserRole | undefined;

    @OneToMany(() => Followers, followers => followers.user)
    following: Followers[]
}