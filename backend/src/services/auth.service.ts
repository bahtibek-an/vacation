import {User, UserRole} from "../entity/user.entity";
import {Repository} from "typeorm";
import {AppDataSource} from "../config/db.config";
import {UserDto, UserLoginDto, UserRegisterDto} from "../dto/user.login.dto";
import ApiError from "../exceptions/api.error.exception";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import {UserJwtPayload} from "../interfaces/RequestWithUser.interface";

dotenv.config();



class AuthService {
    userRepository: Repository<User> = AppDataSource.getRepository(User);


    async login(user: UserLoginDto) {
        const { email, password } = user;
        const candidate = await this.userRepository.findOneBy({ email });
        if(!candidate) {
            throw ApiError.UnauthorizedError();
        }
        const isEqualPassword = await bcrypt.compare(password, candidate.password!);
        if(!isEqualPassword) {
            throw ApiError.UnauthorizedError();
        }
        const accessToken = await this.createAccessToken(candidate.id, candidate.role);
        return new UserDto(accessToken, candidate);
    }

    async register(user: UserRegisterDto) {
        const candidate = await this.userRepository.findOneBy({ email: user.email });
        if(candidate) {
            throw ApiError.ConflictError();
        }
        const hashPassword = await this.createHashPassword(user.password);
        const newUser = await this.userRepository.save({ ...user, password: hashPassword });
        const accessToken = await this.createAccessToken(newUser.id, newUser.role);
        return new UserDto(accessToken, newUser);
    }

    async refresh(refreshToken: string | undefined) {
        if(!refreshToken) {
            throw ApiError.UnauthorizedError();
        }
        const userData = this.validateRefreshToken(refreshToken);
        if(!userData) {
            throw ApiError.UnauthorizedError();
        }
        const user = await this.userRepository.findOneBy({ id: userData.userId });
        if(!user) {
            throw ApiError.UnauthorizedError();
        }
        const accessToken = await this.createAccessToken(user.id, user.role);
        return {
            accessToken,
            user: {
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                id: user.id,
                role: user.role,
            },
        };
    }


    async createAccessToken(userId: number | undefined, userRole: UserRole | undefined) {
        return jwt.sign({ userId: userId, role: userRole }, process.env.JWT_ACCESS_SECRET!, {expiresIn: '7d'});
    }

    async createRefreshToken(userId: number | undefined, userRole: UserRole | undefined) {
        return jwt.sign({ userId: userId, role: userRole }, process.env.JWT_REFRESH_TOKEN!, {expiresIn: "30d"})
    }

    async createHashPassword(password: string) {
        return bcrypt.hash(password, 12);
    }

    validateAccessToken(token: string): UserJwtPayload | null {
        try {
            return <UserJwtPayload>jwt.verify(token, process.env.JWT_ACCESS_SECRET!);
        } catch (e) {
            return null;
        }
    }

    validateRefreshToken(token: string): UserJwtPayload | null {
        try {
            return <UserJwtPayload>jwt.verify(token, process.env.JWT_REFRESH_TOKEN!);
        } catch (e) {
            return null;
        }
    }
}

export default AuthService;