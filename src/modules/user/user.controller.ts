import { Request, Response } from "express";
import { UserService } from "./user.service";

const createUser = async (req: Request, res: Response) => {
  const payload = await req.body;
  try {
    const result = await UserService.createUser(payload);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).send(error)
  }
};

const getAllUser = async (req: Request, res: Response) => {
  try {
    const result = await UserService.getAllUser();
    res.status(200).send(result);
  } catch (error) {
    res.status(500).send(error)
  }
};

export const UserController = { createUser , getAllUser};
