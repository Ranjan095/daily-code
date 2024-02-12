import { Router } from "express";
import { auth } from "../middlewares/auth.middleware.js";
import {
  createPlaylist,
  getPlaylistById,
  getUserPlaylists,
} from "../controllers/playlist.controller.js";

let playlistRouter = Router();

playlistRouter.use(auth);

playlistRouter.route("/create").post(createPlaylist);
playlistRouter.route("/user/:userId").get(getUserPlaylists);
playlistRouter.route("/:playlistId").get(getPlaylistById);

export { playlistRouter };
