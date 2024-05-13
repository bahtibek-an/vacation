import {AppDataSource} from "./config/db.config";
import app from "./app";
import dotenv from "dotenv";
import https from "node:https";
import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import {User, UserRole} from "./entity/user.entity";

const PORT = process.env.PORT || 5000;
dotenv.config();

// const options = {
//     key: fs.readFileSync(path.join(__dirname, "..", "./localhost.key")),
//     cert: fs.readFileSync(path.join(__dirname, "..", "./localhost.crt")),
// };

// const httpServer = https.createServer(options, app);
const httpServer = http.createServer(app);

;(async () => {
    try {
        await AppDataSource.initialize();

        httpServer.listen(PORT, () => {
            console.log(`Listening on port ${PORT}`)
        });
    } catch (e) {
        console.error(e);
    }
})();

process.on("SIGTERM", () => {
    console.log("Received SIGTERM signal. Shutting down gracefully...");
    process.exit(0);
});