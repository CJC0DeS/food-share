import express from "express";
import {
  createfoodpost,
  deletefoodpost,
} from "../controllers/foodpost.controller.js";
import { verifyUser } from "../utils/verifyUser.js";

const foodpostRouter = express.Router();

foodpostRouter.post("/create", verifyUser, createfoodpost);
foodpostRouter.delete("/delete/:id", verifyUser, deletefoodpost);

export { foodpostRouter };
