import { Router } from "express";
import auth from "../controller/auth";
// import { verify } from "../middleware/auth";

const app = Router();

app.use("/auth", auth);

export default app;
