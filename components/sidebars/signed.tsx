"use client";
import React, { useEffect, useState } from "react";
import Logo from "../icons/logo";

import { GoChevronRight, GoChevronDown } from "react-icons/go";

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

export default function SignedSidebar() {
  const resetUser = useResetRecoilState(userAtom);

  const [openModal, setOpenModal] = useState(false);

  const handleClose = () => {
    setOpenModal(false);
  };

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
          <div
            className="flex flex-row gap-3 item-center py-3 mb-3 hover:scale-105 transition cursor-pointer px-2 rounded"
            onClick={() => setOpenModal(true)}
          >
            <EditIcon />
            <span className="flex-[2] ">New Chat</span>
          </div>

          <div className="flex flex-row gap-3 items-center py-3 mb-3 hover:scale-105 transition cursor-pointer px-2 rounded">
            <HistoryIcon />
            <span className="flex-[2]">History</span>
            <IconContext.Provider value={{ size: "1.8em" }}>
              <GoChevronRight />
            </IconContext.Provider>
          </div>
          <div className="w-full">
            {(chats || []).map((chat) => (
              <div
                key={chat.id}
                className={`flex flex-row gap-3 item-center py-3 mb-3 hover:scale-105 transition cursor-pointer px-2 rounded ${
                  chat.id === activeChat
                    ? "bg-[#078] text-white [&_path]:stroke-white "
                    : ""
                }`}
                onClick={() => setActiveChat(chat.id)}
              >
                <span className="flex-[2] truncate ">{chat.topic}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="w-full">
          <div className="flex flex-row gap-3 item-center py-3 mb-3 hover:scale-105 transition cursor-pointer">
            <SettingIcon />
            <span className="flex-[2]">Settings</span>
          </div>
          <div
            className="flex flex-row gap-3 item-center py-3 mb-3 hover:scale-105 transition cursor-pointer"
            onClick={() => logout()}
          >
            <LogoutIcon />
            <span className="flex-[2]">Logout</span>
          </div>
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
    </section>
  );
}
