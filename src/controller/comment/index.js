import { Router } from "express";
import CommentController from "./comment-handler";

const app = Router();
const handler = new CommentController();

app.post("/create", handler.createComment);
app.delete("/:id/delete", handler.deleteComment);

export default app;
