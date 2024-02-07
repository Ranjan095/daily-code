import { Router } from "express";
import { auth } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import {
  deleteVideo,
  getAllVideos,
  getVideoById,
  togglePublishStatus,
  updateVideo,
  uploadVideo,
} from "../controllers/video.controller.js";

let videoRoute = Router();
videoRoute.use(auth);

// get all videos
videoRoute.get("/", getAllVideos);

//upload video
videoRoute.route("/upload-video").post(
  upload.fields([
    {
      name: "videoFile",
      maxCount: 1,
    },
    {
      name: "thumbnail",
      maxCount: 1,
    },
  ]),
  uploadVideo
);

// get video by Id
videoRoute
  .route("/:videoId")
  .get(getVideoById)
  .patch(upload.single("thumbnail"), updateVideo)
  .delete(deleteVideo)
  .post(togglePublishStatus);

  // toggle vidio-publish status;
// videoRoute.route("/toggle/:videoId").patch();

export { videoRoute };
