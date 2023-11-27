import React, { useState } from "react";
import Delete from "../icons/delete";
import Rename from "../icons/rename";
import { useDeleteChat, useUpdateChat } from "@/hook/chat.hook";
import { toast } from "react-hot-toast";
import Modal from "../modal";

interface MenuProps {
  onClose: () => void;
  chatId: string;
  topic: string;
  refetch: () => void;
}

export default function Topic({ onClose, chatId, topic, refetch }: MenuProps) {
  const { mutate: deleteTopic } = useDeleteChat(chatId);
  const { mutate: renameTopic } = useUpdateChat(chatId);

  const [renameModal, setRenameModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);

  const [newTopic, setNewTopic] = useState(topic);

  function rename() {
    if (newTopic === topic) {
      toast.error("Topic is the same");
      return;
    }
    if (newTopic === "") {
      toast.error("Topic cannot be empty");
      return;
    }
    if (newTopic.length > 20) {
      toast.error("Topic cannot be more than 20 characters");
      return;
    }
    
    renameTopic(
      { topic: newTopic },
      {
        onSuccess: () => {
          toast.success("Chat renamed successfully");
          refetch();
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
        refetch();
      },
      onError: (error) => {
        toast.error(error?.response?.data?.detail ?? error?.message);
      },
    });
    onClose();
  }
  return (
    <>
      <div className="bg-white dark:bg-wellgab-black-4 p-2 absolute rounded-md z-20 w-52 top-12 left-52 shadow-md">
        <button
          onClick={() => setRenameModal(() => true)}
          className="flex flex-row gap-3 item-center py-3 mb-3 hover:scale-105 transition cursor-pointer px-2 rounded w-full"
        >
          <Rename />
          <span className="flex-[2] text-left">Rename</span>
        </button>
        <button
          onClick={() => setDeleteModal(() => true)}
          className="flex flex-row gap-3 item-center py-3 mb-3 hover:scale-105 transition cursor-pointer px-2 rounded w-full"
        >
          <Delete />
          <span className="flex-[2] text-left text-wellgab-red-1 ">Delete</span>
        </button>
      </div>
      <Modal open={renameModal} handleClose={() => setRenameModal(() => false)}>
        <div className="bg-white dark:bg-[#202124] rounded-lg w-[40vw] px-6 py-6 pb-4">
          <div className="flex flex-col justify-between w-full mb-5">
            <h1 className="text-2xl font-bold">Rename this chat</h1>
            <p className="text-xl font-normal text-wellgab-white-1 my-3">
              Are you sure you want to rename this chat? This action cannot be
              undone.
            </p>
            <form>
              <input
                type="text"
                className="w-full rounded-md p-2 border border-wellgab-gray-1"
                value={newTopic}
                onChange={(e) => setNewTopic(e.target.value)}
              />
            </form>
            <div className="flex flex-row gap-4 pt-16">
              <button
                onClick={() => setRenameModal(() => true)}
                className="flex-1 py-2 px-4 rounded-md border border-wellgab-green text-wellgab-green"
              >
                Cancel
              </button>
              <button
                onClick={rename}
                className="flex-1 py-2 px-4 rounded-md bg-wellgab-green text-white"
              >
                Rename
              </button>
            </div>
          </div>
        </div>
      </Modal>
      <Modal open={deleteModal} handleClose={() => setDeleteModal(() => false)}>
        <div className="bg-white dark:bg-[#202124] rounded-lg w-[40vw] px-6 py-6 pb-4">
          <div className="flex flex-col gap-4">
            <h1 className="text-2xl font-bold">
              Do you want to delete this chat?
            </h1>
            <p className="text-xl font-normal text-wellgab-white-1">
              {`This action will delete ${topic} and it can't be restored after.`}
            </p>
            <div className="flex flex-row gap-4 justify-end pt-4">
              <button
                onClick={() => setDeleteModal(() => false)}
                className="py-2 px-6 rounded-md bg-wellgab-green text-white"
              >
                Cancel
              </button>
              <button
                onClick={deleteChat}
                className="py-2 px-6 rounded-md bg-wellgab-red-1 text-white"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
}
