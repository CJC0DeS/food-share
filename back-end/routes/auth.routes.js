import express from "express";
import { googleSign, signIn, signUp, signOut } from "../controllers/auth.controller.js";

const authRouter = express.Router();

authRouter.post("/signup", signUp);
authRouter.post("/signin", signIn);
authRouter.post("/google-sign", googleSign);
authRouter.get('/signout', signOut)

export { authRouter };
