"use client";
import React, { useEffect, useState } from "react";
import Logo from "../icons/logo";

import { GoChevronRight, GoChevronDown } from "react-icons/go";
import { BsThreeDotsVertical } from "react-icons/bs";

import { IconContext } from "react-icons";
import EditIcon from "../icons/edit";
import HistoryIcon from "../icons/history";
import SettingIcon from "../icons/setting";
import LogoutIcon from "../icons/logout";
import { useRecoilState, useRecoilValue, useResetRecoilState } from "recoil";
import userAtom from "@/atoms/user.atom";
import Link from "next/link";
import chatAtom, { activeChatIdAtom } from "@/atoms/chat.atom";
import { useCreateChat, useGetChats } from "@/hook/chat.hook";
import { PageLoader } from "../loader";
import Modal from "../modal";
import { useDetectClickOutside } from "react-detect-click-outside";
import Topic from "../menu/topic";
import Close from "../icons/close";

export default function SignedSidebar() {
  const resetUser = useResetRecoilState(userAtom);
  const [menuOpen, setMenuOpen] = useState(false);
  const ref = useDetectClickOutside({
    onTriggered: () => setMenuOpen(false),
  });

  const [openModal, setOpenModal] = useState(false);
  const [showHistory, setShowHistory] = useState(true);
  const [settingsModal, setSettingsModal] = useState(false);

  const handleClose = () => {
    setOpenModal(false);
  };

  const handleSettingsClose = () => {
    setSettingsModal(false);
  };

  function openMenu(
    e: React.MouseEvent<HTMLSpanElement, MouseEvent>,
    id: string
  ) {
    e.stopPropagation();
    setMenuOpen(true);
  }

  function handleHistory() {
    setShowHistory((prev) => !prev);
  }

  const chats = useRecoilValue(chatAtom);
  const [activeChat, setActiveChat] = useRecoilState(activeChatIdAtom);

  const { data, isFetched, isFetching, refetch } = useGetChats();
  const { mutate, isLoading } = useCreateChat();

  useEffect(() => {
    if (isFetched) {
      if (data?.data?.data?.length < 1) {
        mutate(
          { topic: "New Topic" },
          {
            onSuccess: () => {
              refetch();
            },
          }
        );
      } else {
        setActiveChat(data?.data?.data[0].id);
      }
    }
  }, [isFetched, data?.data?.data?.length]); // eslint-disable-line

  const [value, setValue] = useState("");

  const logout = () => {
    resetUser(); // removing user details from recoil
    window.location.href = "/api/auth/logout"; // Logging out of auth0
  };

  const handleSubmit = () => {
    mutate(
      { topic: value },
      {
        onSuccess: () => {
          refetch();
          handleClose();
        },
        onError: (error) => {
          // check if the message is user not found and send the user to login page
          if (error?.response?.data?.detail === "User not found") {
            logout();
          }
          handleClose();
        },
      }
    );
  };

  return (
    <section className="h-screen fixed dark:bg-wellgab-black-4 bg-white py-5  w-[19vw] font-plusJakartaSans ">
      {isFetching || isLoading ? <PageLoader /> : null}
      <Link href={"/"}>
        <div className="flex flex-row items-center justify-center">
          <Logo />{" "}
          <span className="text-[#078] dark:text-white pl-2">WellGab</span>
        </div>
      </Link>

      <div className="flex flex-col items-start justify-between h-[90%] px-4">
        <div className="pt-14 w-full">
          <button
            className="flex flex-row gap-3 item-center py-3 mb-3 hover:scale-105 transition cursor-pointer px-2 rounded w-full"
            onClick={() => setOpenModal(true)}
          >
            <EditIcon />
            <span className="flex-[2] text-left">New Chat</span>
          </button>

          <button
            onClick={handleHistory}
            className="flex flex-row gap-3 items-center py-3 mb-3 hover:scale-105 transition cursor-pointer px-2 rounded w-full"
          >
            <HistoryIcon />
            <span className="flex-[2] text-left">History</span>
            <IconContext.Provider value={{ size: "1.8em" }}>
              {!showHistory ? <GoChevronRight /> : <GoChevronDown />}
            </IconContext.Provider>
          </button>

          <div
            className={`transition-[max-height] overflow-hidden duration-500 ${
              showHistory ? "max-h-[80vh]" : "max-h-0"
            }`}
          >
            <div className="w-full relative pl-6 overflow-y-scroll">
              {(chats || []).map((chat) => (
                <div
                  key={chat.id}
                  className={`flex flex-row gap-3 item-center py-3 mb-3 hover:scale-105 transition cursor-pointer px-2 rounded pl-5 ${
                    chat.id === activeChat
                      ? "bg-[#078] text-white [&_path]:stroke-white "
                      : ""
                  }`}
                  onClick={() => setActiveChat(chat.id)}
                >
                  <span className="flex-[2] truncate">{chat.topic}</span>
                  <div
                    ref={ref}
                    onClick={(e) => openMenu(e, chat.id)}
                    className=""
                  >
                    <IconContext.Provider value={{ size: "1.8em" }}>
                      <BsThreeDotsVertical />
                    </IconContext.Provider>
                  </div>
                </div>
              ))}
              {!!menuOpen && (
                <Topic isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
              )}
            </div>
          </div>
        </div>

        <div className="w-full">
          <button
            className="flex flex-row gap-3 item-center py-3 mb-3 hover:scale-105 transition cursor-pointer w-full"
            onClick={() => setSettingsModal(true)}
          >
            <SettingIcon />
            <span className="flex-[2] text-left">Settings</span>
          </button>
          <button
            className="flex flex-row gap-3 item-center py-3 mb-3 hover:scale-105 transition cursor-pointer w-full"
            onClick={() => logout()}
          >
            <LogoutIcon />
            <span className="flex-[2] text-left">Logout</span>
          </button>
        </div>
      </div>
      <Modal open={openModal} handleClose={handleClose}>
        <div className="bg-white dark:bg-[#202124] rounded-lg w-[40vw] p-6 ">
          <p className=" text-2xl">Create Chat</p>
          <input
            type={value}
            className=" border-[0.3px] border-[#4C4C4C] rounded-lg p-4 w-full mt-6 outline-none"
            placeholder="I have a headache"
            onChange={(e) => setValue(e.target.value)}
          />
          <div className=" pt-16 gap-x-3 flex justify-end">
            <button
              className=" border border-[#078] rounded-lg text-[#078] px-8 py-3 mon-hover"
              onClick={() => handleClose()}
            >
              Cancel
            </button>
            <button
              className=" border bg-[#078] rounded-lg text-white px-8 py-3 mon-hover"
              onClick={() => handleSubmit()}
              disabled={value.length < 1}
            >
              Submit
            </button>
          </div>
        </div>
      </Modal>
      <Modal open={settingsModal} handleClose={handleSettingsClose}>
        <div className="bg-white dark:bg-[#202124] rounded-lg w-[40vw] p-6 ">
          <div className="flex flex-row justify-between w-full">
            <p className="text-2xl font-normal">Settings</p>
            <span
              className="flex items-end cursor-pointer"
              onClick={handleSettingsClose}
            >
              <Close />
            </span>
          </div>
          <div className="flex flex-row justify-between w-full">
            <p className="text-base font-medium">Clear chats after 90 days</p>
            <input type="radio" />
          </div>
          <div className="flex flex-row justify-between w-full">
            <p>Text size</p>
            <select></select>
          </div>
          <div className="flex flex-row justify-between w-full">
            <p>Display</p>
            <input type="radio" />
          </div>
          <div className="flex flex-row justify-between w-full">
            <p>Delete Account</p>
            <button className="bg-wellgab-red-1 text-wellgab-white-1 py-2 px-4 rounded-md text-lg font-normal">
              Delete
            </button>
          </div>
        </div>
      </Modal>
    </section>
  );
}
