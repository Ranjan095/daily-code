import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

export let connectDB = async () => {
  try {
    let connection_init = await mongoose.connect(
      `${process.env.MONGO_URI}/${DB_NAME}`
    );
    console.log(`db has been connected to ${process.env.PORT}`);
    console.log("DB_Host", connection_init.connection.host);
  } catch (error) {
    console.log("MongoDB connection error", error);
  }
};
