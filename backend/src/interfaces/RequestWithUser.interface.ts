import { Request } from "express";
import {JwtPayload} from "jsonwebtoken";
import {UserRole} from "../entity/user.entity";

export interface UserJwtPayload extends JwtPayload {
    userId: number;
    role: UserRole;
}

interface RequestWithUser extends Request {
    user: UserJwtPayload;
}

export default RequestWithUser;