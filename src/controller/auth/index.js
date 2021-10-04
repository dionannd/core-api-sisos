import { Router } from "express";
import AuthController from "./AuthController";

const app = Router();
const handle = new AuthController();

// Route Auth
app.post("/register", handle.register);
app.post("/login", handle.login);

export default app;
