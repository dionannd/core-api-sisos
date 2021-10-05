import { Router } from "express";
import auth from "../controller/auth";
import { verify } from "../middleware/auth";
import user from "../controller/user";
import posting from "../controller/posting";
import comment from "../controller/comment";
import like from "../controller/like";

const app = Router();

app.use("/auth", auth);
app.use("/user", verify, user);
app.use("/posting", verify, posting);
app.use("/comment", verify, comment);
app.use("/like", verify, like);

export default app;
