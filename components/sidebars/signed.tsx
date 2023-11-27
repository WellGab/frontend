"use client";
import React, { Fragment, useEffect, useMemo, useState } from "react";
import Logo from "../icons/logo";
import { toast } from "react-hot-toast";

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
import { useDetectClickOutside } from "react-detect-click-outside";
import Topic from "../menu/topic";
import Close from "../icons/close";

import {
  SettingsType,
  useDeleteAccount,
  useGetSettings,
  useUpdateSettings,
} from "@/hook/settings.hook";
import ChatsBody from "../chats";
import Switch from "../switch";

export default function SignedSidebar() {
  const resetUser = useResetRecoilState(userAtom);
  const [menuOpen, setMenuOpen] = useState(false);
  const ref = useDetectClickOutside({
    onTriggered: () => setMenuOpen(false),
  });

  const [openModal, setOpenModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [password, setPassword] = useState("");
  const [showHistory, setShowHistory] = useState(true);
  const [settingsModal, setSettingsModal] = useState(false);
  const [userSettings, setUserSettings] = useState<SettingsType>({
    ninety_days_chat_limit: false,
    text_size: "small",
    display: "light",
  });

  const [updated, setUpdated] = useState(false);

  const {
    data: settings,
    error,
    isLoading: settingsLoading,
    refetch: settingsRefresh,
  } = useGetSettings();
  const { mutate: updateSettings } = useUpdateSettings();
  const { mutate: deleteAccount } = useDeleteAccount();

  const handleClose = () => {
    setOpenModal(false);
  };

  useEffect(() => {
    if (settings) {
      setUpdated(false);

      setUserSettings(settings.data.data);
    }
  }, [settings]);

  const handleSettingsClose = () => {
    setSettingsModal(false);
  };

  function openMenu(e: React.MouseEvent<HTMLSpanElement, MouseEvent>) {
    e.stopPropagation();
    setMenuOpen(true);
  }

  function handleHistory() {
    setShowHistory((prev) => !prev);
  }

  function handleDeleteAccount() {
    // confirm delete, trigger conformation modal
    // modal to take password
    deleteAccount(
      {
        password: password,
      },
      {
        onSuccess: () => {
          toast.success("Account deleted successfully");
          logout();
        },
        onError: (error: any) => {
          toast.error(error?.response?.data?.detail ?? error?.message);
        },
      }
    );
  }

  function handleUpdateSettings() {
    updateSettings(userSettings, {
      onSuccess: () => {
        toast.success("Settings updated successfully");
        settingsRefresh();
      },
      onError: (error: any) => {
        toast.error(error?.response?.data?.detail ?? error?.message);
      },
    });
  }

  useEffect(() => {
    if (updated) {
      handleUpdateSettings();
    }
  }, [userSettings, updated]); // eslint-disable-line

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
    <section className="h-screen fixed dark:bg-wellgab-black-4 bg-white py-5  w-[19vw] font-plusJakartaSans z-20">
      {isFetching || isLoading ? <PageLoader /> : null}
      <Link href={"/"}>
        <div className="flex flex-row items-center justify-center">
          <Logo />{" "}
          <span className="text-[#078] dark:text-white pl-2 md:flex hidden">
            WellGab
          </span>
        </div>
      </Link>

      <div className="flex flex-col items-start justify-between h-[90%] px-4">
        <div className="pt-14 w-full">
          <button
            className="flex flex-row gap-3 item-center py-3 mb-3 hover:scale-105 transition cursor-pointer md:px-2 rounded w-full"
            title="new chat"
            onClick={() => setOpenModal(true)}
          >
            <EditIcon />
            <span className="flex-[2] text-left md:flex hidden">New Chat</span>
          </button>

          <button
            onClick={handleHistory}
            title="history"
            className="flex flex-row gap-3 items-center py-3 mb-3 hover:scale-105 transition cursor-pointer md:px-2 rounded w-full"
          >
            <HistoryIcon />
            <span className="flex-[2] text-left md:flex hidden">History</span>
            <IconContext.Provider
              value={{ size: "1.8em", className: "md:flex hidden" }}
            >
              {!showHistory ? <GoChevronRight /> : <GoChevronDown />}
            </IconContext.Provider>
          </button>

          <div
            className={`transition-[max-height] h-full  duration-500 ${
              showHistory ? "max-h-[80vh]" : "max-h-0 hidden"
            }`}
          >
            <div className="w-full relative pl-6">
              {(chats || []).map((chat) => (
                <Fragment key={chat.id}>
                  <ChatsBody
                    chat={chat}
                    activeChat={activeChat}
                    setActiveChat={setActiveChat}
                    openMenu={openMenu}
                    ref={ref}
                    menuOpen={menuOpen}
                    setMenuOpen={setMenuOpen}
                  />

                  {!!menuOpen && (
                    <Topic
                      onClose={() => setMenuOpen(false)}
                      topic={chat.topic}
                      chatId={chat.id}
                      refetch={refetch}
                    />
                  )}
                </Fragment>
              ))}
            </div>
          </div>
        </div>

        <div className="w-full">
          <button
            className="flex flex-row gap-3 item-center py-3 mb-3 hover:scale-105 transition cursor-pointer w-full"
            onClick={() => setSettingsModal(true)}
          >
            <SettingIcon />
            <span className="flex-[2] text-left md:flex hidden">Settings</span>
          </button>
          <button
            className="flex flex-row gap-3 item-center py-3 mb-3 hover:scale-105 transition cursor-pointer w-full"
            onClick={() => logout()}
          >
            <LogoutIcon />
            <span className="flex-[2] text-left md:flex hidden">Logout</span>
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
        <div className="bg-white dark:bg-[#202124] rounded-lg w-[40vw] px-6 py-6 pb-24">
          <div className="flex flex-row justify-between w-full mb-5">
            <p className="text-2xl font-normal">Settings</p>
            <span
              className="flex items-end cursor-pointer"
              onClick={handleSettingsClose}
            >
              <Close />
            </span>
          </div>
          {settingsLoading ? <PageLoader /> : null}
          {settings !== null ? (
            <>
              <div className="flex flex-row justify-between w-full mb-6">
                <p className="text-base font-medium">
                  Clear chats after 90 days
                </p>
                <Switch
                  checked={userSettings.ninety_days_chat_limit ? true : false}
                  update={() => {
                    setUpdated(true);
                    setUserSettings((prev) => ({
                      ...prev,
                      ninety_days_chat_limit: !prev.ninety_days_chat_limit,
                    }));
                  }}
                />
              </div>
              <div className="flex flex-row justify-between w-full mb-6">
                <p>Text Size</p>
                <select
                  value={userSettings.text_size}
                  onChange={(e) => {
                    setUpdated(true);
                    setUserSettings((prev) => ({
                      ...prev,
                      text_size: e.target.value,
                    }));
                  }}
                  className="bg-transparent"
                >
                  <option value="small">Small</option>
                  <option value="medium">Medium</option>
                  <option value="large">Large</option>
                </select>
              </div>
              <div className="flex flex-row justify-between w-full mb-6">
                <p>Display</p>
                <select
                  value={userSettings.display}
                  onChange={(e) => {
                    setUpdated(true);
                    setUserSettings((prev) => ({
                      ...prev,
                      display: e.target.value,
                    }));
                  }}
                  className="bg-transparent"
                >
                  <option value="light">Light Mode</option>
                  <option value="dark">Dark Mode</option>
                </select>
              </div>
              <div className="flex flex-row justify-between w-full">
                <p>Delete Account</p>
                <button
                  onClick={() => setDeleteModal(() => true)}
                  className="bg-wellgab-red-1 text-wellgab-white-1 py-2 px-4 rounded-md text-lg font-normal"
                >
                  Delete
                </button>
              </div>
            </>
          ) : null}
        </div>
      </Modal>
      <Modal open={deleteModal} handleClose={() => setDeleteModal(() => false)}>
        <div className="bg-white dark:bg-[#202124] rounded-lg w-[40vw] px-6 py-6 pb-24">
          <div className="flex flex-col justify-between w-full mb-5">
            <p className="text-2xl font-normal mb-3">Delete your account</p>
            <form>
              <label
                htmlFor="password"
                className="text-xl font-normal dark:text-wellgab-white-1 text-wellgab-black-2 mb-3"
              >
                Enter your password to confirm.
              </label>

              <input
                type="password"
                className="w-full rounded-md p-2 bg-transparent border border-wellgab-gray-1"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </form>
            <div className="flex flex-row gap-4 pt-16">
              <button
                onClick={() => setDeleteModal(() => false)}
                className="flex-1 py-2 px-4 rounded-md border border-wellgab-green text-wellgab-green"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteAccount}
                className="flex-1 py-2 px-4 rounded-md bg-wellgab-red-1 text-white"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </section>
  );
}
