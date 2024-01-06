/** @format */

import mongoose from "mongoose";

let speechToTextSchema = mongoose.Schema({
  note: { type: String, required: true },
});

export let SpeechToTextModel =
  mongoose.models.note || mongoose.model("note", speechToTextSchema);
