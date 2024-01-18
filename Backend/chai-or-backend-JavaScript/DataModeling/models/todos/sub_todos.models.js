/** @format */

let mongoose = require("mongoose");

let subTodoSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    isCompleted: {
      type: Boolean,
      default: false,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

export let subTodoModel = mongoose.model("SubTodo", subTodoSchema);
