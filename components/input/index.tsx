"use client";
import React, { useEffect, useState } from "react";
import SendIcon from "../icons/send";
import MicIcon from "../icons/mic";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { toast } from "react-hot-toast";
import { IconContext } from "react-icons";
import { FaMicrophoneAltSlash, FaMicrophone } from "react-icons/fa";

interface ChatInputProps {
  onSend: () => void;
  sendDisabled?: boolean;
  isListening?: boolean;
  setListening: React.Dispatch<React.SetStateAction<boolean>>;
}

export const ChatInput = (
  props: React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > &
    ChatInputProps,
) => {
  const { onSend, sendDisabled, ...rest } = props;
  const [divActive, setDivActive] = useState(false);

  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSend();
  };

  useEffect(() => {
    if (!browserSupportsSpeechRecognition) {
      toast.error("Your browser does not support speech recognition");
      return;
    }
    console.log("transcript", transcript);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [listening]);

  function handleListening() {
    if (!listening) {
      // resetTranscript();
      SpeechRecognition.startListening();
    } else {
      // resetTranscript();
      SpeechRecognition.stopListening();
    }
  }

  return (
    <form className={`flex w-full gap-x-2 items-center`} onSubmit={onSubmit}>
      <div
        className={`flex w-[calc(100%-24px)] gap-x-2  bg-white dark:bg-[#47494F] p-3 rounded-lg border  ${
          divActive ? "border-[#078]" : "border-transparent"
        } `}
      >
        <input
          {...rest}
          type="text"
          className=" bg-transparent w-[calc(100%-24px)] text-sm outline-none"
          placeholder="Message WellGab"
          onFocus={() => {
            setDivActive(true);
          }}
          onBlur={() => {
            setDivActive(false);
          }}
        />
        <button type="button" onClick={() => handleListening()} className="">
          {!listening ? (
            <IconContext.Provider
              value={{ size: "1.5em", className: "md:flex hidden" }}
            >
              <FaMicrophone />
            </IconContext.Provider>
          ) : (
            <IconContext.Provider
              value={{ size: "1.5em", className: "md:flex hidden" }}
            >
              <FaMicrophoneAltSlash />
            </IconContext.Provider>
          )}
        </button>
      </div>
      <button type="submit" disabled={props.sendDisabled}>
        <SendIcon />
      </button>
    </form>
  );
};
