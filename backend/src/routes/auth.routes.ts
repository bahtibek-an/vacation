import express, {Router} from "express";
import AuthController from "../controller/auth.controller";
import {loginValidator, registerValidator} from "../dto/user.login.dto";
import {upload} from "../config/multer.config";


const authRoutes = Router();

const authController = new AuthController();

authRoutes.post("/login", loginValidator, authController.login);
authRoutes.post("/register", registerValidator, authController.register);
authRoutes.delete("/logout", authController.logout)
authRoutes.get("/refresh", authController.refresh);

export default authRoutes;