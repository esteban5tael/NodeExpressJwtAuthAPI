import { Router } from "express";
import { UserController } from "../controllers/user.controller.js";

const userRouter = Router();

userRouter.get("/", UserController.index);
userRouter.get("/:id", UserController.show);
userRouter.post("/", UserController.create);
userRouter.patch("/:id", UserController.update);
userRouter.post("/:id/delete", UserController.userDelete);
userRouter.post("/:id/restore", UserController.restore);
userRouter.delete("/:id/destroy", UserController.destroy);
userRouter.post("/seed", UserController.seed);

export default userRouter;
