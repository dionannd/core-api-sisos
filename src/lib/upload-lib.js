import multer from "multer";
import { v4 as uuid } from "uuid";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = `./public/${file.fieldname}`;
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    const ext = file.originalname.split(".").pop();
    cb(null, uuid().toString() + `.${ext}`);
  },
});

export const upload = multer({ storage: storage });
