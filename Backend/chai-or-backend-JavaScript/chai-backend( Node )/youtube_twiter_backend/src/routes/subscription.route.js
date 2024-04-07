import { Router } from "express";
import { auth } from "../middlewares/auth.middleware.js";
import { toggleSubscription } from "../controllers/subscription.controller.js";

let subscriptionRoute = Router();

subscriptionRoute.use(auth);
subscriptionRoute.route("/c/:channelId").post(toggleSubscription);

export { subscriptionRoute };
