import { Router } from "express";
import AuthController from "./auth-handler";

const app = Router();
const handle = new AuthController();

app.post("/register", handle.register);
app.post("/login", handle.login);

export default app;
