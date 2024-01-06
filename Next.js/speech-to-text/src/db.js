/** @format */

import mongoose from "mongoose";

require("dotenv").config();

export async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.log("Oops! Something went wrong" + "==> " + error.message);
  }
}
