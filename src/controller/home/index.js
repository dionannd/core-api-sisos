import { Router } from "express";
import HomeController from "./home-handler";

const app = Router();
const handler = new HomeController();

app.get("/posting", handler.getUserPosting);

export default app;
