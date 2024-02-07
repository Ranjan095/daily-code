import { Video } from "../models/video.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import {
  deleteOnCloudinaryFile,
  uploadOnCloudinary,
} from "../utils/cloudinary.js";
import mongoose from "mongoose";

//upload video
let uploadVideo = asyncHandler(async (req, res) => {
  let { title, description } = req.body;

  if (!title || !description) {
    return res.status(400).json({ error: "title and description is required" });
  }

  // let file = req.files;
  let videoFilePath = req.files?.videoFile[0]?.path;
  let thumbnailPath = req.files?.thumbnail[0].path;

  if (!videoFilePath || !thumbnailPath) {
    return res
      .status(400)
      .json({ error: "video-file and thumbnail-file is required" });
  }

  let video = await uploadOnCloudinary(videoFilePath, "video");
  let thumbnail = await uploadOnCloudinary(thumbnailPath, "thumbnail");

  let createVideo = await Video.create({
    videoFile: video?.url,
    thumbnail: thumbnail?.url,
    title,
    description,
    duration: video?.duration,
    owner: req.user?._id,
  });
  await createVideo.save();

  return res.status(200).json({
    message: "video and thumbnail uploaded successfully.",
    data: createVideo,
  });
});

// get video by Id;
let getVideoById = asyncHandler(async (req, res) => {
  try {
    let { videoId } = req.params;
    let video = await Video.findById(videoId);
    return res.status(200).json({ data: video });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});

// get all videos
let getAllVideos = asyncHandler(async (req, res) => {
  let { page = 1, limit = 10, query, sortBy, sortType, userId } = req.query;

  // Convert page and limit to numbers
  page = parseInt(page);
  limit = parseInt(limit);

  // Prepare filter object based on userId or any other query parameter you have
  const filter = {};
  if (userId) {
    filter.owner = userId;
  }
  // You can add more conditions here based on your query parameter

  // Prepare sort object based on sortBy and sortType
  const sort = {};
  if (sortBy && sortType) {
    sort[sortBy] = sortType === "desc" ? -1 : 1;
  }

  // Query MongoDB with pagination, sorting, and filtering
  const videos = await Video.find(filter)
    .sort(sort)
    .skip((page - 1) * limit)
    .limit(limit);

  // Return paginated and sorted results
  return res.status(200).json({ data: videos });
});

//update video details like title, description, thumbnail
const updateVideo = asyncHandler(async (req, res) => {
  const { videoId } = req.params;

  let video = await Video.findById(videoId);

  // Ensure both owner and req.user._id are of the same type for comparison
  const ownerId = video.owner.toString(); // Convert owner to string if it's an ObjectId
  const userId = req.user._id.toString(); // Convert user ID to string

  if (ownerId !== userId) {
    return res
      .status(400)
      .json({ error: "You are not authorized to update this video" });
  }

  // getting thumbnail-file path ;
  let thumbnailLocalPath = req.file?.path;
  if (thumbnailLocalPath) {
    // delete old thumbnail first;
    let response = await deleteOnCloudinaryFile(video.thumbnail, "thumbnail");
    console.log(response.deleted);

    //uploading new thumbnail;
    let cloudianary = await uploadOnCloudinary(thumbnailLocalPath, "thumbnail");
    req.body.thumbnail = cloudianary.url;
  }

  let updatedVideo = await Video.findByIdAndUpdate(videoId, req.body, {
    new: true,
  });

  return res.status(200).json({
    message: "Video updated successfully",
    data: updatedVideo,
  });
});

const deleteVideo = asyncHandler(async (req, res) => {
  const { videoId } = req.params;

  let video = await Video.findById(videoId);

  // Ensure both owner and req.user._id are of the same type for comparison
  const ownerId = video.owner.toString(); // Convert owner to string if it's an ObjectId
  const userId = req.user._id.toString(); // Convert user ID to string

  if (ownerId !== userId) {
    return res
      .status(400)
      .json({ error: "You are not authorized to delete this video" });
  }

  try {
    await Video.findByIdAndDelete(videoId);
    res.status(200).json({ message: "Video deleted successfully" });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});

const togglePublishStatus = asyncHandler(async (req, res) => {
  const { videoId } = req.params;
  let video = await Video.findById(videoId);

  // Ensure both owner and req.user._id are of the same type for comparison
  const ownerId = video.owner.toString(); // Convert owner to string if it's an ObjectId
  const userId = req.user._id.toString(); // Convert user ID to string

  if (ownerId !== userId) {
    return res.status(400).json({ error: "You are not authorized" });
  }

  let updateVideoPublicStasus = await Video.findByIdAndUpdate(
    videoId,
    { isPublished: !video.isPublished },
    { new: true }
  );
  return res.status(200).json({
    message: "publicStatus has been changed successfully",
    isPublished: updateVideoPublicStasus.isPublished,
  });
});

export {
  uploadVideo,
  getVideoById,
  getAllVideos,
  updateVideo,
  deleteVideo,
  togglePublishStatus,
};
