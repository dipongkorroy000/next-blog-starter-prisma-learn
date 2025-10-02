import { Router } from "express";
import { PostController } from "./post.controller";

const route = Router();

route.get("/", PostController.getAllPosts);
route.get("/:id", PostController.getPostById);

route.post("/", PostController.postCreate);

route.patch("/:id", PostController.updatePost);

route.delete("/:id", PostController.deletePost);

export const postRouter = route;
