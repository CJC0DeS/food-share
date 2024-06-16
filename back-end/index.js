import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { testRouter } from "./routes/user.routes.js";
dotenv.config();

mongoose
  .connect(process.env.MONGO_KEY)
  .then(() => {
    console.log("connected to mongodb");
  })
  .catch((err) => {
    console.log(err);
  });
const app = express();

app.listen(3000, () => {
  console.log("server is running at 3000");
});

app.use("/api/user", testRouter);
