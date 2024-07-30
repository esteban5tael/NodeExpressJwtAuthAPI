import { Router } from "express";
import { AuthController } from "../controllers/auth.controller.js";
import profileMiddleware from "../middlewares/profile.middleware.js";

const authRouter = Router();

authRouter.post("/register", AuthController.register);
authRouter.post("/login", AuthController.login);
authRouter.get("/profile",profileMiddleware, AuthController.profile);

export default authRouter;
