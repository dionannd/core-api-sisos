import { Router } from "express";
import auth from "../controller/auth";
import posting from "../controller/posting";
import { verify } from "../middleware/auth";

const app = Router();

app.use("/auth", auth);
app.use("/posting", verify, posting);

export default app;
