import { Router } from "express";
import { AppController } from "../controllers/_app.controller.js";

const appRouter = Router();

appRouter.get("/",AppController.AppIndex);

export default appRouter;