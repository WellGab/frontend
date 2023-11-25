"use client";
import React, { useState } from "react";
import SendIcon from "../icons/send";
import MicIcon from "../icons/mic";

interface ChatInputProps {
  onSend: () => void;
  sendDisabled?: boolean;
}

export const ChatInput = (
  props: React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > &
    ChatInputProps
) => {
  const [divActive, setDivActive] = useState(false);
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    props.onSend();
  };
  return (
    <form className={`flex w-full gap-x-2 items-center`} onSubmit={onSubmit}>
      <div
        className={`flex w-[calc(100%-24px)] gap-x-2  bg-white dark:bg-[#47494F] p-3 rounded-lg border  ${
          divActive ? "border-[#078]" : "border-transparent"
        } `}
      >
        <input
          {...props}
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
        <MicIcon />
      </div>
      <button type="submit" disabled={props.sendDisabled}>
        <SendIcon />
      </button>
    </form>
  );
};
