import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";

export const auth = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const hashedPass = bcryptjs.hashSync(password, 7);
    const newUser = new User({ username, email, password: hashedPass });
    await newUser.save();
    res.status(201).json("User created successfully");
  } catch(error) {
    res.status(500).json(error.errmsg);
  }
};
