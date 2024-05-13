import {DataSource} from "typeorm";
import dotenv from "dotenv";
import {User} from "../entity/user.entity";
import {Vacation} from "../entity/vacation.entity";
import {Followers} from "../entity/followers.entity";
dotenv.config();

export const AppDataSource = new DataSource({
    type: "mysql",
    host: process.env.MYSQLDB_HOST,
    port: +process.env.MYSQLDB_LOCAL_PORT!,
    username: process.env.MYSQLDB_USER,
    password: process.env.MYSQLDB_ROOT_PASSWORD,
    database: process.env.MYSQLDB_DATABASE,
    synchronize: true,
    logging: true,
    entities: [User, Vacation, Followers],
    subscribers: [],
    migrations: [],
})