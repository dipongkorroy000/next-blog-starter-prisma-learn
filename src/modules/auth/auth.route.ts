import { Router } from "express";
import { AuthController } from "./auth.controller";

const route = Router();

route.post("/login", AuthController.credentialLogin);
route.post("/google-auth", AuthController.googleAuth);

export const authRouter = route;