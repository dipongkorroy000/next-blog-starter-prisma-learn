import { Router } from "express";
import { UserController } from "./user.controller";

const route = Router();

route.get("/", UserController.getAllUser);
route.post("/", UserController.createUser);

export const userRouter = route;
