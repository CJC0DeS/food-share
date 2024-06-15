import express from "express";
import { test } from "../controllers/user.controller.js";

const getTestRouterouter = express.Router();

getTestRouterouter.get("/test",test);


export {getTestRouterouter}