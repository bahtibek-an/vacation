import {NextFunction, Request, Response} from "express";
import ApiError from "../exceptions/api.error.exception";
import AuthService from "../services/auth.service";
import RequestWithUser from "../interfaces/RequestWithUser.interface";


export default function authMiddleware(req: Request, res: Response, next: NextFunction) {
    try {
        const authService: AuthService = new AuthService();
        const authorizationHeader = req.headers.authorization;
        if (!authorizationHeader) {
            return next(ApiError.UnauthorizedError());
        }
        const accessToken = authorizationHeader.split(' ')[1];
        if(!accessToken) {
            return next(ApiError.UnauthorizedError());
        }
        const user = authService.validateAccessToken(accessToken);
        if(!user) {
            return next(ApiError.UnauthorizedError());
        }
        (req as RequestWithUser).user = user;
        next();
    } catch (e) {
        next(ApiError.UnauthorizedError());
    }
}