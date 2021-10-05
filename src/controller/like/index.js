import { Router } from "express";
import LikeController from "./like-handler";

const app = Router();
const handler = new LikeController();

app.post("/posting", handler.postingLike);
app.post("/comment", handler.commentLike);
app.delete("/:id/posting/delete", handler.deletePostingLike);
app.delete("/:id/comment/delete", handler.deleteCommentLike);

export default app;
