import { Request, Response } from "express";
import { AuthService } from "./auth.service";

const credentialLogin = async (req: Request, res: Response) => {
  try {
    const payload = await req.body;

    const result = await AuthService.credentialLogin(payload);

    res.status(200).send(result);
  } catch (error) {
    res.status(400).send(error);
  }
};

const googleAuth = async (req: Request, res: Response) => {
  try {
    const payload = await req.body;

    const result = await AuthService.googleAuth(payload);

    res.status(200).send(result);
  } catch (error) {
    res.status(400).send(error);
  }
};



export const AuthController = { credentialLogin, googleAuth };
