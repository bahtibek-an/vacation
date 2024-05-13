import {Router} from "express";
import authRoutes from "./auth.routes";
import vacationRoutes from "./vacation.routes";


const routes = Router();

routes.use("/auth", authRoutes);
routes.use("/vacation", vacationRoutes)

export default routes;