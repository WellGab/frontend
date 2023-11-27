import React, { useState } from "react";
import Delete from "../icons/delete";
import Rename from "../icons/rename";
import { useDeleteChat, useUpdateChat } from "@/hook/chat.hook";
import { toast } from "react-hot-toast";
import Modal from "../modal";
import { useDetectClickOutside } from "react-detect-click-outside";

interface MenuProps {
  onClose: () => void;
  chatId: string;
  topic: string;
  refetch: () => void;
  setDeleteModal: React.Dispatch<React.SetStateAction<boolean>>;
  setRenameModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Topic({
  onClose,
  chatId,
  topic,
  refetch,
  setDeleteModal,
  setRenameModal,
}: MenuProps) {
  const ref = useDetectClickOutside({
    onTriggered: () => onClose(),
  });

  return (
    <>
      <div
        className="bg-white dark:bg-wellgab-black-4 p-2 absolute rounded-md z-20 w-52 top-12 left-52 shadow-md"
        ref={ref}
      >
        <button
          onClick={() => {
            setRenameModal(() => true);
            onClose();
          }}
          className="flex flex-row gap-3 item-center py-3 mb-3 hover:scale-105 transition cursor-pointer px-2 rounded w-full"
        >
          <Rename />
          <span className="flex-[2] text-left">Rename</span>
        </button>
        <button
          onClick={() => {
            setDeleteModal(() => true);
            onClose();
          }}
          className="flex flex-row gap-3 item-center py-3 mb-3 hover:scale-105 transition cursor-pointer px-2 rounded w-full"
        >
          <Delete />
          <span className="flex-[2] text-left text-wellgab-red-1 ">Delete</span>
        </button>
      </div>
    </>
  );
}
