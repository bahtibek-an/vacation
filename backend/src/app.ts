import express from "express";
import cors from "cors";
import "reflect-metadata"
import {AppDataSource} from "./config/db.config";
import routes from "./routes";
import errorMiddleware from "./middlewares/error.middleware";
import path from "node:path";
import cookieParser from "cookie-parser";
import morgan from "morgan";

const app = express();
app.use(morgan("combined"));
app.use(cors({
    origin: "http://localhost:7000/",
    credentials: true
}));
// app.use(cors({
//     origin: ['http://localhost:4000'],
//     credentials: true,
//     allowedHeaders: ['Content-Type', 'Authorization'],
//     exposedHeaders: ['Set-Cookie']
// }));
app.use(cookieParser());
app.use(express.json());

app.use(express.static(path.join(__dirname, "..", "uploads")));

app.use("/api/v1", routes);
app.use(errorMiddleware);


export default app;