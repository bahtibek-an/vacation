import express from "express";
import ApiError from "../exceptions/api.error.exception";


export default function(err: any, req: express.Request, res: express.Response, next: express.NextFunction) {
    if(err instanceof ApiError) {
        console.error(err.message + "0--------------------------")
        const host = req.hostname
    console.error(err, host, "----------");
        return res.status(err.status).json({message: err.message, status: err.errors});
    }
    const host = req.hostname
    console.error(err, host, "----------");
    return res.status(500).json({message: "Unexpected error"});
}