import { Router } from "express";
import FollowController from "./following-handler";

const app = Router();
const handler = new FollowController();

app.post("/create", handler.followUser);
app.delete("/:id/delete", handler.deleteFollowUser);

export default app;
