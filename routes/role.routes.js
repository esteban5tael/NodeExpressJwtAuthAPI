import { Router } from "express";
import { RoleController } from "../controllers/role.controller.js";

const roleRouter = Router();

roleRouter.get("/", RoleController.index);
roleRouter.get("/:id", RoleController.show);
roleRouter.post("/", RoleController.create);
roleRouter.patch("/:id", RoleController.update);
roleRouter.post("/:id/delete", RoleController.roleDelete);
roleRouter.post("/:id/restore", RoleController.restore);
roleRouter.delete("/:id/destroy", RoleController.destroy);
roleRouter.post("/seed", RoleController.seed);

export default roleRouter;
