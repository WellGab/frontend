import React from "react";
import Delete from "../icons/delete";
import Rename from "../icons/rename";
import Share from "../icons/share";
import { useDeleteChat, useUpdateChat } from "@/hook/chat.hook";
import { toast } from "react-hot-toast";

interface MenuProps {
  isOpen: boolean;
  onClose: () => void;
  chatId: string;
  topic: string;
}

export default function Topic({ isOpen, onClose, chatId, topic }: MenuProps) {
  const { mutate: deleteTopic } = useDeleteChat(chatId);
  const { mutate: renameTopic } = useUpdateChat(chatId);

  function share() {}

  function rename() {
    renameTopic(
      { topic },
      {
        onSuccess: () => {
          toast.success("Chat renamed successfully");
        },
        onError: (error) => {
          toast.error(error?.response?.data?.detail ?? error?.message);
        },
      },
    );
    onClose();
  }

  function deleteChat() {
    deleteTopic(undefined, {
      onSuccess: () => {
        toast.success("Chat deleted successfully");
      },
      onError: (error) => {
        toast.error(error?.response?.data?.detail ?? error?.message);
      },
    });
    onClose();
  }
  return (
    <div className="dark:bg-wellgab-black-4 p-2 absolute rounded-md z-20 w-52 top-12 left-52">
      <button
        onClick={share}
        className="flex flex-row gap-3 item-center py-3 mb-3 hover:scale-105 transition cursor-pointer px-2 rounded w-full"
      >
        <Share />
        <span className="flex-[2] text-left">Share</span>
      </button>
      <button onClick={rename} className="flex flex-row gap-3 item-center py-3 mb-3 hover:scale-105 transition cursor-pointer px-2 rounded w-full">
        <Rename />
        <span className="flex-[2] text-left">Rename</span>
      </button>
      <button
        onClick={deleteChat}
        className="flex flex-row gap-3 item-center py-3 mb-3 hover:scale-105 transition cursor-pointer px-2 rounded w-full"
      >
        <Delete />
        <span className="flex-[2] text-left text-wellgab-red-1 ">Delete</span>
      </button>
    </div>
  );
}
