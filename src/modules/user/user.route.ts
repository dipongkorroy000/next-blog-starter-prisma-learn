import { Router } from "express";
import { UserController } from "./user.controller";

const route = Router();

route.get("/", UserController.getAllUser);
route.get("/:id", UserController.getUserById);

route.post("/", UserController.createUser);

route.patch("/:id", UserController.updateUser);
route.delete("/:id", UserController.deleteUser);

export const userRouter = route;
