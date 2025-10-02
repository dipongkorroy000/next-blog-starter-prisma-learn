import { Request, Response } from "express";
import { UserService } from "./user.service";

const createUser = async (req: Request, res: Response) => {
  const payload = await req.body;
  try {
    const result = await UserService.createUser(payload);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).send(error);
  }
};

const getAllUser = async (req: Request, res: Response) => {
  try {
    const result = await UserService.getAllUser();
    res.status(200).send(result);
  } catch (error) {
    res.status(500).send(error);
  }
};

const getUserById = async (req: Request, res: Response) => {
  const id = req.params.id;
  try {
    const user = await UserService.getUserById(Number(id));
    res.status(200).send(user);
  } catch (error) {
    res.status(500).send(error);
  }
};

const updateUser = async (req: Request, res: Response) => {
  try {
    const result = await UserService.updateUser(Number(req.params.id), req.body);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).send(error);
  }
};

const deleteUser = async (req: Request, res: Response) => {
  try {
    const result = await UserService.deleteUser(Number(req.params.id));
    res.status(201).json(result);
  } catch (error) {
    res.status(500).send(error);
  }
};

export const UserController = { createUser, getAllUser, getUserById, updateUser, deleteUser };
