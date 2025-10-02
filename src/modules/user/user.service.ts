import { Prisma } from "@prisma/client";
import { prisma } from "../../config/db";

const createUser = async (payload: Prisma.UserCreateInput) => {
  const createUser = await prisma.user.create({ data: payload });
  return createUser;
};

const getAllUser = async () => {
  const result = await prisma.user.findMany({
    select: { id: true, name: true, email: true, phone: true, picture: true, createdAt: true, updatedAt: true, role: true, status: true },
  });
  return result;
};

export const UserService = { createUser, getAllUser };
