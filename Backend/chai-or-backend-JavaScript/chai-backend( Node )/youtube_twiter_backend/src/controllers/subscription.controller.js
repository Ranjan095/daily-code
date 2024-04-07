import { Subscription } from "../models/subscription.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";

let toggleSubscription = asyncHandler(async (req, res) => {
  let { channelId } = req.params;
  //   console.log({ channelId: channelId });
  if (!channelId) {
    return res
      .status(404)
      .send({ message: "Somthing went wrong maybe channelId is not provided" });
  }

  //check if channel is already subscribed
  let isSubscribed = await Subscription.findOne({ channel: channelId });
  if (isSubscribed) {
    await Subscription.deleteOne({ channel: channelId });
    return res.status(200).send({ message: "channel has been unsubscribed" });
  }

  // if not subscribed then subscribe
  let subscription = await Subscription.create({
    subscriber: req.user?._id,
    channel: channelId,
  });

  await subscription.save();

  if (!subscription) {
    return res
      .status(404)
      .send({ message: "Somthing went wrong while toggling subscription" });
  }

  res.status(200).send({
    message: "channel has been subscribed successfully",
  });
});

export { toggleSubscription };
