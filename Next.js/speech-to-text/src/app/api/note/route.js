/** @format */

import { connectDB } from "@/db";
import { SpeechToTextModel } from "@/model/speectToText.model";
import { NextResponse } from "next/server";

connectDB();

export async function POST(req) {
  try {
    let reqBody = await req.json();
    let note = new SpeechToTextModel(reqBody);
    await note.save();

    return NextResponse.json(
      { msg: "note has been created!" },
      { status: 200 }
    );
  } catch (error) {
    console.log(error.message);
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
