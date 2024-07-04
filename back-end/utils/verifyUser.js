import { errorHandler } from "./error.js";
import jwt from "jsonwebtoken";

export const verifyUser = (req, res, next) => {
  const token = req.cookies.access_token;
  if (!token) {
    next(errorHandler(401, "Unauthorized updation: Cookie Not Found"));
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      next(errorHandler(403, "Forbidden"));
    }
    req.user = user;
    next();
  });
};
