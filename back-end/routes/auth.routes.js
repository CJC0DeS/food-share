import express from "express";
import { signIn, signUp } from "../controllers/auth.controller.js";

const authRouter = express.Router();

authRouter.post("/signup", signUp);
authRouter.get('/signin',signIn)

export { authRouter };
