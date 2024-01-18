/** @format */

let mongoose = require("mongoose");

let categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export let Category = mongoose.model("Category", categorySchema);
