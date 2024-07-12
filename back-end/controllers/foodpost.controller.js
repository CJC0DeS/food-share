import Foodpost from "../models/foodpost.model.js";
import { errorHandler } from "../utils/error.js";

export const createfoodpost = async (req, res, next) => {
  try {
    const foodPost = await Foodpost.create(req.body);
    return res.status(201).json(foodPost);
  } catch (error) {
    next(error);
  }
};

export const deletefoodpost = async (req, res, next) => {
  const foodPost = await Foodpost.findById(req.params.id);
  if (!foodPost) {
    return next(errorHandler(404, "Post not found!"));
  }
  if (req.user.id !== foodPost.userRef) {
    console.log("user.id", req.user.id, "foodpost", foodPost);
    return next(
      errorHandler(
        401,
        "Unauthorized request: You can only delete your own post"
      )
    );
  }
  try {
    await Foodpost.findByIdAndDelete(req.params.id);
    res.status(200).json("Post has been deleted Successfully!");
  } catch (error) {
    next(error);
  }
};

export const updateFoodpost = async (req, res, nest) => {
  const foodPost = await Foodpost.findById(req.params.id);
  if (!foodPost) {
    return next(errorHandler(404, "Post not found!"));
  }
  if (req.user.id !== foodPost.userRef) {
    return next(
      errorHandler(
        401,
        "Unauthorized request: You can only delete your own post"
      )
    );
  }

  try {
    const updatedPost = await Foodpost.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json(updatedPost);
  } catch (error) {
    next(error);
  }
};
