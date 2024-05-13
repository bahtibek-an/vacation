import {Router} from "express";
import authMiddleware from "../middlewares/auth.middleware";
import VacationController from "../controller/vacation.controller";
import roleMiddleware from "../middlewares/role.middleware";
import {UserRole} from "../entity/user.entity";
import {createVacationValidator} from "../dto/vacation.dto";


const vacationRoutes = Router();
const vacationController = new VacationController();

vacationRoutes.get("/", authMiddleware, vacationController.getAll);
vacationRoutes.get("/:id", authMiddleware, roleMiddleware(UserRole.ADMIN), vacationController.getOne);

vacationRoutes.post("/stats/", authMiddleware, roleMiddleware(UserRole.ADMIN), vacationController.getVacationStats);
vacationRoutes.post("/download-csv", authMiddleware, roleMiddleware(UserRole.ADMIN), vacationController.getCsvFile);

vacationRoutes.post("/create", authMiddleware, roleMiddleware(UserRole.ADMIN), createVacationValidator, vacationController.create);
vacationRoutes.patch("/update/:id", authMiddleware, roleMiddleware(UserRole.ADMIN), createVacationValidator, vacationController.update);
vacationRoutes.delete("/delete/:id", authMiddleware, roleMiddleware(UserRole.ADMIN), vacationController.delete);

vacationRoutes.post("/follow-vacation/:vacationId", authMiddleware, vacationController.followVacation);
vacationRoutes.delete("/unfollow-vacation/:vacationId", authMiddleware, vacationController.unfollowVacation);

export default vacationRoutes;