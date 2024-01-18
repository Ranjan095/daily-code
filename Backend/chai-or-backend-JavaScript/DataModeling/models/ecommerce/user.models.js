/** @format */

let mongoose = require("mongoose");

let userSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
    enum: ["male", "female", "other"],
    message: "{VALUE} is not supported",
  },
  address: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "UserAddress",
    },
  ],
});

export let User = mongoose.model("User", userSchema);
