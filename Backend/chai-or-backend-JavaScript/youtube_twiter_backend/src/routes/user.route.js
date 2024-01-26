import { Router } from "express";
import {
  loginUser,
  logoutUser,
  refreshAccessToken,
  userRegister,
} from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { auth } from "../middlewares/auth.middleware.js";

// uploading files on local server
let uploadFileUsingMulter = upload.fields([
  { name: "avatar", maxCount: 1 },
  { name: "coverImage", maxCount: 1 },
]);

let userRoute = Router();

userRoute.post("/register", uploadFileUsingMulter, userRegister);
// userRoute.route("/register").post(userRegister);
userRoute.post("/login", loginUser);
userRoute.post("/logout",auth, logoutUser);
userRoute.post("/refresh-token",refreshAccessToken)

export { userRoute };
