import { Post, Prisma } from "@prisma/client";
import { prisma } from "../../config/db";

const postCreate = async (payload: Prisma.PostCreateInput): Promise<Post> => {
  const post = await prisma.post.create({ data: payload, include: { author: { select: { id: true, name: true, email: true } } } });
  return post;
};

const getAllPosts = async ({
  page = 1,
  limit = 10,
  search,
  isFeatured,
  tags,
}: {
  page?: number;
  limit?: number;
  search?: string;
  isFeatured?: boolean;
  tags?: string[];
}) => {
  // console.log({ page, limit, search, isFeatured, tags });

  const skip = (page - 1) * limit;

  const where: any = {
    AND: [
      search && {
        OR: [{ title: { contains: search, mode: "insensitive" } }, { content: { contains: search, mode: "insensitive" } }],
      },
      typeof isFeatured === "boolean" && { isFeatured },
      tags && tags?.length > 0 && { tags: { hasEvery: tags } },
    ].filter(Boolean),
  };

  const result = await prisma.post.findMany({
    skip,
    take: limit,
    where: where,
    include: { author: true },
    orderBy: { createdAt: "desc" },
  });

  const total = await prisma.post.count();
  const totalPages = await Math.ceil(total / limit);

  return { data: result, meta: { page, limit, total, totalPages } };
};

const getPostById = async (id: number) => {
  return await prisma.$transaction(async (tx) => {
    await tx.post.update({
      where: { id },
      data: { views: { increment: 1 } },
    });

    return await tx.post.findUnique({ where: { id }, include: { author: true } });
  });
};

const updatePost = async (id: number, data: Partial<any>) => {
  return prisma.post.update({ where: { id }, data });
};

const deletePost = async (id: number) => {
  return prisma.post.delete({ where: { id } });
};

const getBlogStat = async () => {
  return await prisma.$transaction(async (tx) => {
    const aggregates = await tx.post.aggregate({ _count: true, _sum: { views: true }, _avg: { views: true }, _max: { views: true }, _min: { views: true } });

    const featuredCount = await tx.post.count({ where: { isFeatured: true } });

    const topFeatured = await tx.post.findFirst({ where: { isFeatured: true }, orderBy: { views: "desc" } });

    const lastWeek = new Date();
    lastWeek.setDate(lastWeek.getDate() - 7);

    const lastWeekPosts = await tx.post.count({ where: { createdAt: { gte: lastWeek } } });

    return {
      stats: {
        totalPosts: aggregates._count ?? 0,
        totalViews: aggregates._sum.views ?? 0,
        avgViews: aggregates._avg.views ?? 0,
        maxViews: aggregates._max.views ?? 0,
        minViews: aggregates._min.views ?? 0,
      },
      featured: { count: featuredCount, topPost: topFeatured, lastWeekPosts },
    };
  });
};

export const PostService = { postCreate, getAllPosts, getPostById, updatePost, deletePost, getBlogStat };
