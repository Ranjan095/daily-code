/** @format */

let mongoose = require("mongoose");

let todoSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    discription: {
      type: String,
    },
    subTodos: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "SubTodo",
      },
    ], // Array of Sub-Todos
  },
  { timestamps: true }
);

export let TodoModel = mongoose.model("Todo", todoSchema);
