import express from "express";
import { test } from "../controllers/user.controller.js";

const getTestRouter = express.Router();

getTestRouter.get("/test",test);


export {getTestRouter}