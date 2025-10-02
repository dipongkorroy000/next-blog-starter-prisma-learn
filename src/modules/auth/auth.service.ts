import { Prisma } from "@prisma/client";
import { prisma } from "../../config/db";

const credentialLogin = async (payload: { email: string; password: string }) => {
  const user = await prisma.user.findUnique({ where: { email: payload.email } });
  if (!user) throw new Error("User not found");

  if (user.password === payload.password) return user;
  else throw new Error("password  is incorrect");
};

const googleAuth = async (payload: Prisma.UserCreateInput) => {
  console.log(payload);

  let user = await prisma.user.findUnique({ where: { email: payload.email } });

  if (!user) {
    user = await prisma.user.create({ data: payload });
  }

  return user;
};

export const AuthService = { credentialLogin, googleAuth };
