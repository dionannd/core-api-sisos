import { Router } from "express";
import UserController from "./user-handler";
import { upload } from "../../lib/upload-lib";

const app = Router();
const handler = new UserController();

app.put("/edit/:id", handler.editUser);
app.get("/profil/stats/:id", handler.getFollower);
app.put("/upload/image", upload.single("profil_pic"), handler.uploadImage);
app.put("/password", handler.updatePassword);

export default app;
