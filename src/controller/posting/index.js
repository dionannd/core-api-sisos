import { Router } from "express";
import PostingController from "./posting-handler";
import { upload } from "../../lib/upload-lib";
const app = Router();
const handler = new PostingController();

app.get("/list", handler.getUserPosting);
app.get("/self/:id", handler.getPostingSelf);
app.get("/detail/:id", handler.getDetail);
app.post("/create", upload.single("image_posting"), handler.createPosting);
app.delete("/delete/:id", handler.deletePosting);

export default app;
