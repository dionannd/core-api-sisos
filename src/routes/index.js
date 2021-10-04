import { Router } from "express";
import auth from "../controller/auth";
import { verify } from "../middleware/auth";
import user from "../controller/user";
import posting from "../controller/posting";

const app = Router();

app.use("/auth", auth);
app.use("/user", verify, user);
app.use("/posting", verify, posting);

export default app;
