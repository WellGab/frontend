"use client";
import WarningIcon from "@/components/icons/warning";
import { ChatInput } from "@/components/input";
import NavBar from "@/components/navbar";
import TypingSpan from "@/components/typingSpan";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import WithoutAuth from "@/hocs/withoutAuth.hoc";
import { useRecoilState, useRecoilValue } from "recoil";
import { anonChatIdAtom } from "@/atoms/chat.atom";
import {
  useCreateAnonChat,
  useGetChatAnon,
  useSendAnonChat,
} from "@/hook/chat.hook";
import toast from "react-hot-toast";
import { useScrollToBottom } from "@/hook/util.hook";
import { MessageLoader, PageLoader } from "@/components/loader";
import { v4 } from "uuid";

const Page = () => {
  const [value, setValue] = useState("");
  const [messages, setMessages] = useState<{ message: string; gpt: boolean }[]>(
    []
  );
  const [anonChatId, setAnonChatId] = useRecoilState(anonChatIdAtom);

  const { mutate, isLoading } = useSendAnonChat(anonChatId);
  const anonChatMutate = useCreateAnonChat();

  function onSend() {
    if (value.length < 1) {
      toast.error("Please enter a message");
    }
    setMessages((prev) => [...prev, { message: value, gpt: false }]);
    setValue("");
    mutate(
      { message: value },
      {
        onSuccess: (data) => {
          setMessages((prev) => [
            ...prev,
            { message: data?.data?.data, gpt: true },
          ]);
        },
      }
    );
  }

  const { data, isFetching, refetch } = useGetChatAnon(anonChatId);

  useEffect(() => {
    if (anonChatId && anonChatId !== "empty") {
      refetch();
    } else if (anonChatId === "empty") {
      const id = v4();
      anonChatMutate.mutate(id, {
        onSuccess: (data) => {
          setAnonChatId(data?.data?.data?.id);
        },
      });
    }
  }, [anonChatId]); // eslint-disable-line

  useEffect(() => {
    if (data?.data?.data) {
      let new_messages: { message: string; gpt: boolean }[] = [];
      data?.data?.data?.conversations?.forEach(
        (m: { message: string; reply: string }) => {
          new_messages = new_messages.concat([
            { message: m.message, gpt: false },
            { message: m.reply, gpt: true },
          ]);
        }
      );

      setMessages(new_messages);
    }
  }, [data]);

  const scrollRef = useScrollToBottom(messages);

  return (
    <section className="dark:bg-[#202124] min-h-screen pb-14 ">
      <NavBar showLinks={false} />
      {isFetching || anonChatMutate.isLoading ? <PageLoader /> : null}

      <div className="px-[6.25rem] font-plusJakartaSans mt-16">
        <h1 className=" text-[40px] dark:text-transparent bg-clip-text bg-hero-gradient font-semibold text-center">
          Hello, I am WellGab. Your AI assistant for all your <br /> symptoms
          and diagnosis questions
        </h1>
        <div className="flex items-center mt-5 gap-x-2 mx-auto w-max">
          <WarningIcon />
          <p className=" text-[#B4B4B4] dark:text-[#B4B4B4] text-center">
            This is for informational purposes only. Don&apos;t take any actions
            without a doctor&apos;s validation or consultation.
          </p>
        </div>
      </div>

      <div className="bg-[#F5FAFA] dark:bg-[#24252B] mx-[6.25rem] p-8 mt-7 rounded-lg font-plusJakartaSans">
        <div className=" w-full h-full ">
          <div className="w-full h-[50vh] overflow-y-scroll space-y-6 py-4">
            {messages.map((message, index) => (
              <div key={index}>
                {message.gpt ? (
                  <div className="w-[80%]">
                    <p className=" text-xs font-medium">
                      WellGab Health Assistant
                    </p>

                    <div className="w-full bg-white dark:bg-[#47494F] p-4 mt-2 rounded-lg dark:text-gpt text-[#4C4C4C] border-[0.3px]  dark:border-transparent whitespace-pre-wrap">
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
            ))}
            {isLoading ? <MessageLoader /> : null}
            <div ref={scrollRef} />
          </div>

          <div className=" w-full space-y-10">
            <ChatInput
              onSend={onSend}
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />

            <div className=" w-full bg-bg-utilize rounded-xl py-5">
              <p className=" text-xl font-semibold text-center text-white">
                You have You&apos;re limited to 10 chats with WellGab. To enjoy
                unlimited access and <br /> your chat history, Sign up below at
                no extra charge or hidden cost.
              </p>
              <Link href={"/auth/signup"} className="w-max mx-auto block mt-10">
                <button className="bg-[#078] font-sans text-sm xl:text-lg rounded-lg px-8 text-white py-2 mon-hover ">
                  Sign Up
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WithoutAuth(Page);
