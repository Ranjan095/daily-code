import { User } from "../models/user.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";

let auth = asyncHandler(async (req, res, next) => {
  try {
    const token =
      req.cookies?.accessToken ||
      req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      res.status(401).json({ error: "please login first" });
    }
    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    let user = await User.findById(decodedToken?._id).select(
      "-password -accessToken"
    );
    if (!user) {
      res.status(401).json({ error: "invilid access token" });
    }
    req.user = user;
    next();
  } catch (error) {
    res.status(402).json({ error: "token is not vailid", error });
  }
});
export { auth };
