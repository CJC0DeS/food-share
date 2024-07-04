import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";
import { generateRandomPassword } from "../utils/passwordGenerator.js";

export const signUp = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    const hashedPass = bcryptjs.hashSync(password, 7);
    const newUser = new User({ username, email, password: hashedPass });
    await newUser.save();
    res.status(201).json("User created successfully");
  } catch (error) {
    next(error);
  }
};

export const signIn = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const validUser = await User.findOne({ email: email });
    if (!validUser) return next(errorHandler(404, "User not found"));
    const validPass = bcryptjs.compareSync(password, validUser.password);
    if (!validPass) return next(errorHandler(401, "Inccorrect password"));
    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);
    // Remove password from validUser
    const { password: value, ...userWithoutPass } = validUser._doc;
    res
      .cookie("access_token", token, { httpOnly: true })
      .status(200)
      .json(userWithoutPass);
  } catch (error) {
    next(error);
  }
};

export const googleSign = async (req, res, next) => {
  const { email, displayName, photoURL } = req.body;
  try {
    const validUser = await User.findOne({ email: email });
    // If user has already signed up to the portal
    if (validUser) {
      const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);
      // Remove password from validUser
      const { password: value, ...userWithoutPass } = validUser._doc;
      res
        .cookie("access_token", token, { httpOnly: true })
        .status(200)
        .json(userWithoutPass);
    }

    // If user has not signed up to the portal
    else {
      const randomlyGeneratedPass = generateRandomPassword(12);
      const hashedPassword = bcryptjs.hashSync(randomlyGeneratedPass, 7);
      const generatedUserName =
        displayName.split(" ").join("").toLowerCase() +
        generateRandomPassword(6);
      while (true) {
        const validUser = await User.findOne({ username: generatedUserName });
        if (!validUser) {
          break;
        }
        generatedUserName =
          displayName.split(" ").join("").toLowerCase() +
          generateRandomPassword(6);
      }

      const newUser = new User({
        username: generatedUserName,
        email: email,
        password: hashedPassword,
        avatar: photoURL,
      });
      await newUser.save();

      const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
      // Remove password from validUser
      const { password: value, ...userWithoutPass } = newUser._doc;
      res
        .cookie("access_token", token, { httpOnly: true })
        .status(200)
        .json(userWithoutPass);
    }
  } catch (error) {
    next(error);
  }
};
