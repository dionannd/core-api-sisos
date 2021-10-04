import { Router } from "express";
import AuthController from "./auth-handler";

const app = Router();
const handle = new AuthController();

// Route Auth
//test
app.post("/register", handle.register);
app.post("/login", handle.login);

export default app;
