"use client";
import Logo from "@/components/icons/logo";
import { ChatInput } from "@/components/input";
import TypingSpan from "@/components/typingSpan";

import React, { useState } from "react";
// import SpeechRecognition, {
//   useSpeechRecognition,
// } from "react-speech-recognition";

export default function Page() {
  const [search, setSearch] = React.useState<string>("");
  // const {
  //   transcript,
  //   listening,
  //   resetTranscript,
  //   browserSupportsSpeechRecognition
  // } = useSpeechRecognition();

  const [messages, setMessages] = useState<{ message: string; gpt: boolean }[]>(
    [
      {
        message:
          "Hello! I'm here to support with any health-related questions or worries you may have. PLEASE NOTE! The more detailed information you share, the better I can assist you.",
        gpt: true,
      },
    ]
  );

  return (
    <div className=" px-14  pt-[10vh]">
      <div className="h-[80vh] ">
        {messages.length > 0 ? (
          messages.map((message, index) => (
            <div key={index}>
              {message.gpt ? (
                <div className="w-[80%]">
                  <p className=" text-xs font-medium">
                    WellGab Health Assistant
                  </p>

                  <div className="w-full bg-white dark:bg-[#47494F] p-4 mt-2 rounded-lg dark:text-gpt text-[#4C4C4C] border-[0.3px]  dark:border-transparent">
                    <TypingSpan
                      text={message.message}
                      type={index === messages.length - 1}
                    />
                  </div>
                </div>
              ) : (
                <div className="w-[80%] ml-auto">
                  <p className=" text-xs font-medium text-right">You</p>

                  <div className="w-full border-[0.3px] border-[#078] dark:border-transparent bg-[#EEF6F7] dark:bg-[#47494F] p-4 mt-2 rounded-lg dark:text-gpt text-[#4C4C4C]">
                    {message.message}
                  </div>
                </div>
              )}
            </div>
          ))
        ) : (
          <div className="flex items-center justify-center flex-col pt-[30vh]">
            <Logo width={64} height={64} />
            <p className="mt-4 text-center font-semibold text-4xl">
              Hello, I am WellGab. Your AI assistant for all your symptoms and
              diagnosis questions
            </p>
          </div>
        )}
      </div>
      <ChatInput onSend={() => {}} />
    </div>
  );
}
