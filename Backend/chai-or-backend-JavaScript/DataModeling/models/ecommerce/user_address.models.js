/** @format */

let mongoose = require("mongoose");

let userAddressSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    mobileNumber: {
      type: Number,
      validate: {
        validator: function (v) {
          return /^\d{10}$/.test(v.toString());
        },
        message: "Please enter a valid 10-digit mobile number",
      },
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    landmark: {
      type: String,
    },
    alternateMobileNumber: {
      type: Number,
      validate: {
        validator: function (v) {
          return /^\d{10}$/.test(v.toString());
        },
        message: "Please enter a valid 10-digit mobile number",
      },
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

export let UserAddressModel = mongoose.model("UserAddress", userAddressSchema);
