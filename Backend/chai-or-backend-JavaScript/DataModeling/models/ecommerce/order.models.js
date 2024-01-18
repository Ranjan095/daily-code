/** @format */

let mongoose = require("mongoose");

let orderItemSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "product",
  },
  quantity: {
    type: Number,
    default: 1,
  },
});

let orderSchema = new mongoose.Schema(
  {
    orderItems: {
      type: [orderItemSchema],
      required: true,
    },
    orderPrice: {
      type: Number,
      required: true,
    },
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    status: {
      type: String,
      enum: ["pending", "processing", "cancelled", "completed"],
      default: "pending",
      message: "{VALUE} is not acceptable",
    },
    address: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "UserAddress",
    },
  },
  { timestamps: true }
);

export let Order = mongoose.model("Order", orderSchema);
