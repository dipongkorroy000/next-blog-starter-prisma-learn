import { Post, Prisma } from "@prisma/client";
import { prisma } from "../../config/db";

const postCreate = async (payload: Prisma.PostCreateInput): Promise<Post> => {
  const post = await prisma.post.create({ data: payload, include: { author: { select: { id: true, name: true, email: true } } } });
  return post;
};

export const PostService = { postCreate };
