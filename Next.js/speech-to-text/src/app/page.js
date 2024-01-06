/** @format */
"use client";
import "regenerator-runtime/runtime";
import { useEffect, useState } from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { Loader2, Mic, MicOff } from "lucide-react";
import { async } from "regenerator-runtime";
import axios from "axios";

export default function Home() {
  let startListening = () => {
    SpeechRecognition.startListening({ continuous: true, language: "en-IN" });
  };
  let {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  // console.log(useSpeechRecognition());
  let [print, setPrint] = useState("");
  let [state, setState] = useState("");
  let [loading, setLoading] = useState(false);
  let [mic, setMic] = useState(false);

  let handleMic = () => {
    setMic(!mic);
  };

  let handleChange = (e) => {
    setState(e.target.value);
  };

  let handleClick = () => {
    setLoading(true);
    // setPrint(state);
    axios
      .post("/api/note", { note: state })
      .then((res) => {
        setLoading(false);
        console.log(res);
        setState("");
        resetTranscript();
        alert("Data has been sent!");
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
        alert("Opps Something went wrong");
      });
  };

  let handleReset = () => {
    resetTranscript();
    setState("");
  };

  useEffect(() => {
    setState(transcript);
  }, [transcript]);

  useEffect(() => {
    mic ? startListening() : SpeechRecognition.stopListening();
  }, [mic]);
  // if (!browserSupportsSpeechRecognition) {
  //   return null;
  // }
  return (
    <div className=" text-center min-h-screen">
      <h1 className=" text-3xl">Speech to text</h1>
      <div className=" flex justify-center gap-3">
        <textarea
          rows="10"
          onChange={handleChange}
          value={state}
          className=" px-2 text-black w-[500px] rounded-md font-semibold my-4"
          placeholder="Speech..."
        />

        <button
          onClick={handleMic}
          className={`${mic ? "text-green-500" : "text-red-500"}`}
        >
          {mic ? <Mic /> : <MicOff />}
        </button>
      </div>
      <div className=" flex justify-center space-x-3">
        <button
          disabled={loading ? true : false}
          hidden={state ? false : true}
          onClick={handleClick}
          className={`font-bold bg-green-500 rounded-md p-2 mt-2 ${
            loading && "cursor-not-allowed"
          } }`}
        >
          {!loading ? (
            "send"
          ) : (
            <Loader2 className={`${loading && "animate-spin"}`} />
          )}
        </button>
        <button
          hidden={state ? false : true}
          onClick={handleReset}
          className=" font-bold bg-red-500 rounded-md p-2 mt-2"
        >
          Reset
        </button>
      </div>
      {/* <div hidden={state ? false : true}>
        <p className=" mt-4">{print}</p>
      </div> */}
    </div>
  );
}
