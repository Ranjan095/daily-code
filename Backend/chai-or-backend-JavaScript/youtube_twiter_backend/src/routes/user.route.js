import { Router } from "express";
import { userRegister } from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.middleware.js";

// uploading files on local server
let uploadFileUsingMulter = upload.fields([
  { name: "avatar", maxCount: 1 },
  { name: "coverImage", maxCount: 1 },
]);

let userRoute = Router();

userRoute.post("/register", uploadFileUsingMulter, userRegister);
// userRoute.route("/register").post(userRegister);

export { userRoute };
