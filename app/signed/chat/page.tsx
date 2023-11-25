"use client";
import { activeChatIdAtom } from "@/atoms/chat.atom";
import Logo from "@/components/icons/logo";
import { ChatInput } from "@/components/input";
import { PageLoader } from "@/components/loader";
import TypingSpan from "@/components/typingSpan";
import withAuth from "@/hocs/withAuth.hoc";
import { useCreateChat, useGetChat, useGetChats } from "@/hook/chat.hook";

import React, { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
// import SpeechRecognition, {
//   useSpeechRecognition,
// } from "react-speech-recognition";

function Page() {
  const [messages, setMessages] = useState<{ message: string; gpt: boolean }[]>(
    [
      {
        message:
          "Hello! I'm here to support with any health-related questions or worries you may have. PLEASE NOTE! The more detailed information you share, the better I can assist you.",
        gpt: true,
      },
    ]
  );
  const activeChatId = useRecoilValue(activeChatIdAtom);

  const { data, isFetching, refetch } = useGetChat(activeChatId);

  useEffect(() => {
    if (activeChatId) {
      refetch();
    }
  }, [activeChatId]); // eslint-disable-line

  return (
    <div className=" px-14  pt-[10vh]">
      {isFetching ? <PageLoader /> : null}
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
    <main className="flex flex-row gap-4">
      <SignedSidebar />
      <div className="flex-[3] flex items-center justify-center flex-col">
        <Logo width={64} height={64} />
        <p className="mt-4 text-center font-semibold text-4xl">
          Hello, I am WellGab. Your AI assistant for all your symptoms and
          diagnosis questions
        </p>
        <form onSubmit={handleSubmit} className="">
          <input
            type="text"
            name="search"
            id="search"
            placeholder="Search for symptoms"
            className="w-[80%] h-10 mt-4 px-4 rounded-md border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
          />
          <button
            type="submit"
            className="w-[80%] h-10 mt-4 px-4 rounded-md border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
          >
            Search
          </button>
        </form>
      </div>
      <ChatInput onSend={() => {}} />
    </div>
  );
}

export default withAuth(Page);
