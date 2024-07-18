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

export const getFoodPost = async (req, res, next) => {
  try {
    const foodPost = await Foodpost.findById(req.params.id);
    if (!foodPost) {
      return next(errorHandler(404, "Post not found!"));
    }
    res.status(200).json(foodPost);
  } catch (error) {
    next(error);
  }
};

export const getAllFoodPosts = async (req, res, next) => {
  try {
    const limit = parseInt(req.query.limit) || 10;
    const startIndex = parseInt(req.query.startIndex) || 0;
    const searchTerm = req.query.searchTerm || "";
    const sort = req.query.sort || "createdAt";
    const order = req.query.order === "asc" ? 1 : -1;

    let servingCountFilter = {};
    if (req.query.servingCount === "less than 10") {
      servingCountFilter = { servings: { $gte: 1, $lt: 10 } };
    } else if (req.query.servingCount === "less than 50") {
      servingCountFilter = { servings: { $gt: 10, $lt: 50 } };
    } else if (req.query.servingCount === "50 or above") {
      servingCountFilter = { servings: { $gte: 50 } };
    }

    const matchedFoodposts = await Foodpost.find({
      $and: [
        {
          $or: [
            { name: { $regex: searchTerm, $options: "i" } },
            { pickupAddress: { $regex: searchTerm, $options: "i" } },
            { description: { $regex: searchTerm, $options: "i" } },
            { mealType: { $regex: searchTerm, $options: "i" } },
          ],
        },
        servingCountFilter,
      ],
    })
      .sort({ [sort]: order })
      .limit(limit)
      .skip(startIndex);

    return res.status(200).json(matchedFoodposts);
  } catch (error) {
    next(error);
  }
};
