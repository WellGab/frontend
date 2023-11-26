import React from "react";
import { IconContext } from "react-icons";
import { BsThreeDotsVertical } from "react-icons/bs";
import Topic from "./menu/topic";

interface ChatsProps {
  chat: {
    id: string;
    topic: string;
  };
  activeChat: string;
  setActiveChat: (id: string) => void;
  openMenu: (e: any, id: string) => void;
  ref: React.MutableRefObject<null>;
  menuOpen: boolean;
  setMenuOpen: (open: boolean) => void;
}
function ChatsBody({
  chat,
  activeChat,
  setActiveChat,
  openMenu,
  ref,
  menuOpen,
  setMenuOpen,
}: ChatsProps) {
  return (
    <div className="relative">
      <div
        className={`flex flex-row gap-3 item-center py-3 mb-3 hover:scale-105 transition cursor-pointer px-2 rounded pl-5 ${
          chat.id === activeChat
            ? "bg-[#078] text-white [&_path]:stroke-white "
            : ""
        }`}
        onClick={() => setActiveChat(chat.id)}
      >
        <span className="flex-[2] truncate">{chat.topic}</span>
        <div ref={ref} onClick={(e) => openMenu(e, chat.id)} className="">
          <IconContext.Provider value={{ size: "1.8em" }}>
            <BsThreeDotsVertical />
          </IconContext.Provider>
        </div>
      </div>

      {!!menuOpen && (
        <Topic
          onClose={() => setMenuOpen(false)}
          topic={chat.topic}
          chatId={chat.id}
        />
      )}
    </div>
  );
}

export default ChatsBody;
