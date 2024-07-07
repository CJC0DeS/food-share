import express from "express";
import {
  test,
  updateUser,
  deleteUser,
  getUserPosts,
} from "../controllers/user.controller.js";
import { verifyUser } from "../utils/verifyUser.js";

const userRouter = express.Router();

userRouter.get("/test", test);
userRouter.patch("/update/user/:id", verifyUser, updateUser);
userRouter.delete("/delete/user/:id", verifyUser, deleteUser);
userRouter.get('/foodposts/user/:id', verifyUser, getUserPosts )

export { userRouter };
