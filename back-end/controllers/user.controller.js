import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import Foodpost from "../models/foodpost.model.js";

export const test = (req, res) => {
  res.json({
    testMessage: "This route works",
  });
};

export const updateUser = async (req, res, next) => {
  if (req.user.id !== req.params.id) {
    try {
      errorHandler(
        401,
        "Unauthorized updation: JWT User id and current user id mismatch"
      );
    } catch (error) {
      return next(error);
    }
  }

  try {
    if (req.body.password) {
      req.body.password = bcryptjs.hashSync(req.body.password, 7);
    }

    const updateUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          username: req.body.username,
          email: req.body.email,
          password: req.body.password,
          avatar: req.body.avatar,
        },
      },
      { new: true }
    );

    // Remove password from updateUser
    const { password: value, ...userWithoutPass } = updateUser._doc;
    return res.status(200).json(userWithoutPass);
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (req, res, next) => {
  if (req.user.id !== req.params.id) {
    try {
      errorHandler(
        401,
        "Unauthorized deletion: JWT User id and current user id mismatch"
      );
    } catch (error) {
      return next(error);
    }
  }
  try {
    await User.findByIdAndDelete(req.params.id);
    res.clearCookie('access_token');
    res.status(200).json('User deleted successfully!');
  } catch (error) {
    next(error);
  }
};

export const getUserPosts = async (req, res, next) => {
  if (req.user.id !== req.params.id) {
    try {
      errorHandler(
        401,
        "Unauthorized request: JWT User id and current user id mismatch"
      );
    } catch (error) {
      return next(error);
    }
  }
  try {
    const query = { userRef: req.params.id };
    const foodPosts = await Foodpost.find(query);
    return res.status(200).json(foodPosts);
  } catch (error) {
    next(error);
  }
}
