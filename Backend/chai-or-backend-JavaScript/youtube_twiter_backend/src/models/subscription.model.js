import mongoose from "mongoose";

let subscriptionSchema = new mongoose.Schema(
  {
    subscriber: {
      type: mongoose.Schema.Types.ObjectId, // who is subscribing
      ref: "User",
    },
    channel: {
      type: mongoose.Schema.Types.ObjectId, // for whome is subscribing
      ref: "User",
    },
  },
  { timestamps: true }
);

export let Subscription = mongoose.model("Subscription", subscriptionSchema);
