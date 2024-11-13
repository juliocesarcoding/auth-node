import * as pingController from "../controllers/ping";
import { Router } from "express";
import * as authController from "../controllers/auth";
import * as privateController from "../controllers/private";
import { verifyJWT } from "../libs/jwt";

export const mainRouter = Router();
mainRouter.get("/ping", pingController.pingController);
mainRouter.post("/auth/signin", authController.signin);
mainRouter.post("/auth/signup", authController.signup);
mainRouter.post("/auth/useotp", authController.useOTP);

mainRouter.get("/private", verifyJWT, privateController.privateFunction);
