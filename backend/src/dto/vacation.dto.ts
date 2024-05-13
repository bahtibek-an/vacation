import {check} from "express-validator";
import {upload} from "../config/multer.config";


export const createVacationValidator = [
    upload.single('picture'),
    check("destination").notEmpty().withMessage("Destination is required"),
    check("description").notEmpty().withMessage("Description is required"),
    check("price")
        .notEmpty()
        .withMessage("Price is required")
        .isFloat({ min: 0, max: 10000 })
        .withMessage("Price must be between $0 and $10000"),
    check("start_date")
        .notEmpty()
        .withMessage("Start date is required")
        .isDate()
        .withMessage("Start date must be a valid date.")
        .isAfter(new Date().toISOString().split("T")[0])
        .withMessage("Start date cannot be in the past"),
    check("end_date")
        .notEmpty()
        .withMessage("End date is required")
        .isDate()
        .withMessage("End date must be a valid date.")
        .custom((value, { req }) => {
            if(new Date(value) <= new Date(req.body.start_date)) {
                throw new Error("End date must be after the start date.");
            }
            return true;
        }),
]

export class CreateVacationDTO {
    destination: string;
    description: string;
    price: number;
    picture: string;
    start_date: Date;
    end_date: Date;
}