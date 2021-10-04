import { Router } from "express";
import UserController from "./user-handler";
import { upload } from "../../lib/upload-lib";

const app = Router();
const handler = new UserController();

app.put("/:id", handler.editUser);
app.put("/upload/image", upload.single("profil_pic"), handler.uploadImage);

export default app;
