import express from "express";
import {
  createfoodpost,
  deletefoodpost,
  getFoodPost,
  updateFoodpost,
} from "../controllers/foodpost.controller.js";
import { verifyUser } from "../utils/verifyUser.js";

const foodpostRouter = express.Router();

foodpostRouter.post("/create", verifyUser, createfoodpost);
foodpostRouter.delete("/delete/:id", verifyUser, deletefoodpost);
foodpostRouter.post("/update/:id", verifyUser, updateFoodpost);
foodpostRouter.get("/get/:id", getFoodPost);

export { foodpostRouter };
