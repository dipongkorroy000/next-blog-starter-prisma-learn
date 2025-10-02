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

const getAllPosts = async (req: Request, res: Response) => {
  try {
    const tags = req.query.tags ? (req.query.tags as string).split(",") : [];
    const isFeatured = req.query.isFeatured ? req.query.isFeatured === "true" : undefined;
    const search = (req.query.search as string) || "";
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;

    const result = await PostService.getAllPosts({ page, limit, search, isFeatured, tags });
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch posts", details: err });
  }
};

const getPostById = async (req: Request, res: Response) => {
  const post = await PostService.getPostById(Number(req.params.id));
  if (!post) return res.status(404).json({ error: "Post not found" });
  res.json(post);
};

const updatePost = async (req: Request, res: Response) => {
  const post = await PostService.updatePost(Number(req.params.id), req.body);
  res.json(post);
};

const deletePost = async (req: Request, res: Response) => {
  await PostService.deletePost(Number(req.params.id));
  res.json({ message: "Post deleted" });
};

const getBlogStat = async (req: Request, res: Response) => {
  try {
    const result = await PostService.getBlogStat();

    res.status(200).send(result);
  } catch (error) {
    res.status(400).send(error);
  }
};

export const PostController = { postCreate, getAllPosts, getPostById, updatePost, deletePost, getBlogStat };
