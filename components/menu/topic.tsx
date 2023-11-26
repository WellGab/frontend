import React from "react";
import EditIcon from "../icons/edit";
import Delete from "../icons/delete";
import Rename from "../icons/rename";
import Share from "../icons/share";
// create a floating menu that opens to show some options that can be selected, the options are share, rename and delete
// the menu should be able to be opened by clicking on the menu icon

interface MenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Topic({ isOpen, onClose }: MenuProps) {
  function share() {}

  function rename() {}

  function deleteTopic() {}
  return (
    <div className="dark:bg-wellgab-black-4 p-2 absolute rounded-md z-20 w-52 top-12 left-52">
      <button className="flex flex-row gap-3 item-center py-3 mb-3 hover:scale-105 transition cursor-pointer px-2 rounded w-full">
        <Share />
        <span className="flex-[2] text-left">Share</span>
      </button>
      <button className="flex flex-row gap-3 item-center py-3 mb-3 hover:scale-105 transition cursor-pointer px-2 rounded w-full">
        <Rename />
        <span className="flex-[2] text-left">Rename</span>
      </button>
      <button className="flex flex-row gap-3 item-center py-3 mb-3 hover:scale-105 transition cursor-pointer px-2 rounded w-full">
        <Delete />
        <span className="flex-[2] text-left text-wellgab-red-1 ">Delete</span>
      </button>
    </div>
  );
}
