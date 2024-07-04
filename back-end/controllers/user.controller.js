import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";

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
