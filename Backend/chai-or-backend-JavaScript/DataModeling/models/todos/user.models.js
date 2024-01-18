/** @format */

const mongoose = require("mongoose");

let userSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      unique: true,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },

    gender: {
      type: String,
      enum: ["male", "female", "other"],
      message: "{VALUE} is not supported",
    },
  },
  { timestamps: true }
);

export let UserModel = mongoose.model("User", userSchema);
