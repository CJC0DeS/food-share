import express from "express";
import { createfoodpost } from "../controllers/foodpost.controller.js";
import { verifyUser } from "../utils/verifyUser.js";

const foodpostRouter = express.Router();

foodpostRouter.post("/create", verifyUser, createfoodpost);

export { foodpostRouter };
