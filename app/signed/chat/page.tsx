"use client";
import "regenerator-runtime/runtime";
import { activeChatIdAtom } from "@/atoms/chat.atom";
import Logo from "@/components/icons/logo";
import { ChatInput } from "@/components/input";
import { MessageLoader, PageLoader } from "@/components/loader";
import TypingSpan from "@/components/typingSpan";
import withAuth from "@/hocs/withAuth.hoc";
import { useGetChat, useSendChat } from "@/hook/chat.hook";

import React, { useEffect, useRef, useState } from "react";
import { useRecoilValue } from "recoil";
import { toast } from "react-hot-toast";
import { useScrollToBottom } from "@/hook/util.hook";

function Page() {
  const [isListening, setListening] = useState(false);
  const [value, setValue] = useState("");
  const [messages, setMessages] = useState<{ message: string; gpt: boolean }[]>(
    []
  );
  const activeChatId = useRecoilValue(activeChatIdAtom);

  const { mutate, isLoading } = useSendChat(activeChatId);

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

  const { data, isFetching, refetch } = useGetChat(activeChatId);

  useEffect(() => {
    if (activeChatId) {
      refetch();
    }
  }, [activeChatId]); // eslint-disable-line

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

  const messageBoxRef = useRef<HTMLDivElement>(null);

  const scrollRef = useScrollToBottom(messageBoxRef);

  return (
    <div className="md:px-14 px-2 pt-[10vh]">
      {isFetching ? <PageLoader /> : null}
      <div className="h-[80vh] overflow-y-scroll  py-4">
        {messages.length > 0 ? (
          messages.map((message, index) => (
            <div key={index}>
              {message.gpt ? (
                <div className="md:w-[80%] w-[95%]">
                  <p className=" text-xs font-medium">
                    WellGab Health Assistant
                  </p>

                  <div
                    className="w-full bg-white dark:bg-[#47494F] p-4 mt-2 rounded-lg dark:text-gpt text-[#4C4C4C] border-[0.3px]  dark:border-transparent whitespace-pre-wrap"
                    ref={messageBoxRef}
                  >
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
        {isLoading ? <MessageLoader /> : null}
        <div ref={scrollRef} />
      </div>

      <ChatInput
        onSend={onSend}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        setInput={setValue}
        // sendDisabled={false}
      />
    </div>
  );
}

export default withAuth(Page);
