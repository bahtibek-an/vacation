import {NextFunction, Request, Response} from "express";
import RequestWithBody from "../interfaces/RequstWithBody.interface";
import {validationResult} from "express-validator";
import ApiError from "../exceptions/api.error.exception";
import VacationService from "../services/vacation.service";
import {CreateVacationDTO} from "../dto/vacation.dto";
import RequestWithUser from "../interfaces/RequestWithUser.interface";
import { stringify } from "csv-stringify";

class AuthController {
    private readonly vacationService: VacationService;

    constructor() {
        this.vacationService = new VacationService();
    }

    getAll = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const data = await this.vacationService.getVacationsWithFollowersCount()
            const fullUrl = req.protocol + '://' + req.get('host') + "/";
            const userId = (req as RequestWithUser).user.userId;
            const follow = req.query.follow === 'true';
            const upcoming = req.query.upcoming === 'true';
            const active = req.query.active === 'true';

            const page = parseInt(req.query.page as string) || 1;
            const limit = parseInt(req.query.limit as string) || 10;

            const offset = (page - 1) * limit;


            const vacations = await this.vacationService.getAllVacations(
                fullUrl,
                userId,
                follow,
                upcoming,
                active,
                limit,
                offset
            );
            return res.json({
                results: vacations.data,
                page,
                limit,
                totalRecords: vacations.total
            });
        } catch (e) {
            next(e);
        }
    }

    getVacationStats = async(req: Request, res: Response, next: NextFunction) => {
        try {
            const stats = await this.vacationService.getVacationsWithFollowersCount();
            return res.json(stats);
        } catch(e) {
            next(e);
        }
    }

    getOne = async (req: Request, res: Response, next: NextFunction) => {
        const { id } = req.params;
        try {
            const vacation = await this.vacationService.getVacationById(+id);
            return res.json(vacation);
        } catch(e) {
            next(e);
        }
    }

    create = async (req: RequestWithBody<CreateVacationDTO>, res: Response, next: NextFunction) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                throw ApiError.BadRequest("error", errors.array());
            }
            if (!req.file) {
                throw ApiError.BadRequest("Picture is required");
            }
            const picture = req.file.filename;
            const vacation = await this.vacationService.createVacation({...req.body, picture});
            return res.status(201).json(vacation);
        } catch (e) {
            next(e);
        }
    }

    update = async (req: RequestWithBody<Partial<CreateVacationDTO>>, res: Response, next: NextFunction) => {
        const { id } = req.params;
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                throw ApiError.BadRequest("error", errors.array());
            }
            const picture = req.file?.filename;
            const vacation = await this.vacationService.updateVacation(id, {...req.body, picture});
            return res.json(vacation);
        } catch (e) {
            next(e);
        }
    }

    delete = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const id = req.params.id;
            const vacation = await this.vacationService.deleteVacation(id);

            return res.status(200).json(vacation);
        } catch (e) {
            next(e);
        }
    }

    followVacation = async (req: Request, res: Response, next: NextFunction) => {
        const { vacationId } = req.params;
        const userId = (req as RequestWithUser).user.userId;
        try {
            const follower = await this.vacationService.followToVacation(userId, +vacationId);
            return res.status(201).json(follower);
        } catch (e) {
            next(e);
        }
    }

    unfollowVacation = async (req: Request, res: Response, next: NextFunction) => {
        const { vacationId } = req.params;
        const userId = (req as RequestWithUser).user.userId;
        try {
            const follower = await this.vacationService.unfollowFromVacation(userId, +vacationId);
            return res.status(200).json(follower);
        } catch (e) {
            next(e);
        }
    }

    getCsvFile = async (req: Request, res: Response, next: NextFunction) => {
        const parsedData = await this.vacationService.getVacationsWithFollowersCount();
        const data = parsedData.map((item) => ({
            Destination: item.destination,
            Followers: item.followersCount,
        }))
        res.header('Content-Type', 'text/csv');
        res.header('Content-Disposition', 'attachment; filename="filename.csv"');
        stringify(data, { header: true })
            .pipe(res);
    }


}

export default AuthController;