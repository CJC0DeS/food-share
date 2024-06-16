import User from "../models/user.model.js";

export const auth = async (req, res) => {
    try{
        const { username, email, password } = req.body;
        const newUser = new User({ username, email, password });
        await newUser.save();
        res.status(201).json("User created successfully");
    }
    catch{
        res.status(400).json("User not created");
    }

  }