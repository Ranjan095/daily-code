import mongoose from "mongoose";

let playlistSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    video: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Video",
      },
    ],
    owner: {
      type: mongoose.Schema.types.ObjectId,
      ref: "User",
    },
  },
  { timeseries: true }
);

export let Playlist = mongoose.model("Playlist", playlistSchema);
