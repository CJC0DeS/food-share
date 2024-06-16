import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { testRouter } from "./routes/user.routes.js";
import { authRouter } from "./routes/auth.routes.js";
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
app.use(express.json());

app.listen(3000, () => {
  console.log("server is running at 3000");
});

app.use("/api/user", testRouter);
app.use("/api/auth", authRouter);
