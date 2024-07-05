import Foodpost from "../models/foodpost.model.js";

export const createfoodpost = async (req, res, next) => {
  try {
    const foodPost = await Foodpost.create(req.body);
    return res.status(201).json(foodPost);
  } catch (error) {
    next(error);
  }
};
