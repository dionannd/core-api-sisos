import { Router } from "express";
import auth from "../controller/auth";
import { verify } from "../middleware/auth";
import user from "../controller/user";

const app = Router();

app.use("/auth", auth);
app.use("/user", verify, user);

export default app;
