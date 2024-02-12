import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

export let app = express();
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

// routes imported
import { userRoute } from "./routes/user.route.js";
import { videoRoute } from "./routes/video.route.js";

// all routes
app.use("/api/v1/user", userRoute);
app.use("/api/v1/video", videoRoute);