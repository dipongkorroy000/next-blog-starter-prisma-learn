import { Request, Response } from "express";
import { PostService } from "./post.service";

const postCreate = async (req: Request, res: Response) => {
  const payload = await req.body;
  try {
    const result = await PostService.postCreate(payload);
    res.status(201).send(result);
  } catch (error) {
    res.status(400).send(error);
  }
};

export const PostController = { postCreate };
