import { Router } from "express";
import { PostController } from "./post.controller";

const route = Router();

route.post("/", PostController.postCreate);

export const postRouter = route;
