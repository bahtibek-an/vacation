import multer from "multer";
import path from "node:path";
import { v4 as uuidv4 } from 'uuid';

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, "..", "..", "uploads"));
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = uuidv4();
        cb(null, `${uniqueSuffix}${file.originalname}`);
    }
});


export const upload = multer({ storage: storage });