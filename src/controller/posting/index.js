import { Router } from "express";
import PostingController from "./posting-handler";

const app = Router();
const handler = new PostingController();

app.post("/create", handler.createPosting);

export default app;
