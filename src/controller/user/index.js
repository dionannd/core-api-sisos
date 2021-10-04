import { Router } from "express";
import UserController from "./user-handler";

const app = Router();
const handler = new UserController();

app.put("/:id", handler.editUser);

export default app;
