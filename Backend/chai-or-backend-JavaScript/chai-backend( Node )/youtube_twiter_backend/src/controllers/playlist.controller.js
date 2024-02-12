import mongoose, { isValidObjectId } from "mongoose";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Playlist } from "../models/playlist.model.js";

let createPlaylist = asyncHandler(async (req, res) => {
  let { name, description } = req.body;

  if (!name || !description) {
    return res.status(400).json({ error: "name and description is required" });
  }

  let playlist = await Playlist.create({
    name,
    description,
    owner: req.user?._id,
  });

  if (!playlist) {
    return res
      .status(400)
      .json({ error: "Somthing went wrong while creating playlist!" });
  }

  return res.status(200).json({
    message: "Playlist created successfully",
    data: playlist,
  });
});

let getUserPlaylists = asyncHandler(async (req, res) => {
  let { userId } = req.params;

  if (!userId) {
    return res
      .status(400)
      .json({ error: "Somthing went wrong while gathering playlists" });
  }

  let playlist = await Playlist.find({ owner: userId });

  return res.status(200).json({
    message: "playlists fetched successfully",
    data: playlist,
  });
});

let getPlaylistById = asyncHandler(async (req, res) => {
  let { playlistId } = req.params;

  if (!playlistId) {
    return res
      .status(400)
      .json({ error: "please provide a playlistId in params!" });
  }

  let playlist = await Playlist.findById(playlistId);

if(!playlist)return res.status(400).json({error:"Somthing went wrong while fetching playlist check playlistId"})

  return res.status(200).json({
    message: "playlist has been fetched successfully",
    data: playlist,
  });
});

export { createPlaylist, getUserPlaylists, getPlaylistById };
