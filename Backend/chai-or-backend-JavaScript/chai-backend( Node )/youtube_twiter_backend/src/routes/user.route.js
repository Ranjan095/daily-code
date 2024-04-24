import { Router } from "express";
import {
  changeCurrentPassword,
  getCurrentUser,
  getUserChannelProfile,
  loginUser,
  logoutUser,
  refreshAccessToken,
  updateUserAvatar,
  updateUserCoverImage,
  updateUserEmailOrFullName,
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

// userRoute.route("/register").post(userRegister);
userRoute.post("/register", uploadFileUsingMulter, userRegister);
userRoute.post("/login", loginUser);
userRoute.post("/refresh-token", refreshAccessToken);

// secured routes
userRoute.post("/logout", auth, logoutUser);
userRoute.post("/change-password", auth, changeCurrentPassword);
userRoute.get("/get-current-user", auth, getCurrentUser);
userRoute.patch("/update-email-fullname", auth, updateUserEmailOrFullName);
userRoute.get("/channel-profile/:userName", auth, getUserChannelProfile);

// upload file on server using multer
userRoute.patch(
  "/update-user-avatar",
  auth,
  upload.single("avatar"),
  updateUserAvatar
);
// upload file on server using multer
userRoute.patch(
  "/update-user-coverImage",
  auth,
  upload.single("coverImage"),
  updateUserCoverImage
);


export { userRoute };
