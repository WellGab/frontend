"use client";
import React from "react";
import Logo from "../icons/logo";

import { GoChevronRight, GoChevronDown } from "react-icons/go";

import { IconContext } from "react-icons";
import EditIcon from "../icons/edit";
import HistoryIcon from "../icons/history";
import SettingIcon from "../icons/setting";
import LogoutIcon from "../icons/logout";

export default function SignedSidebar() {
  const logout = () => {
    window.location.href = "/api/auth/logout";
    localStorage.removeItem("token");
  };
  return (
    <section className="h-screen fixed dark:bg-wellgab-black-4 bg-white py-5 px-7 w-[19vw]">
      <div className="flex flex-row items-center justify-center">
        <Logo />{" "}
        <span className="text-[#078] dark:text-white pl-2">WellGab</span>
      </div>

      <div className="flex flex-col items-start justify-between h-[90%]">
        <div className="pt-14 w-full">
          <div className="flex flex-row gap-3 item-center py-3 mb-3 hover:bg-wellgab-black-1 cursor-pointer">
            <EditIcon />
            <span className="flex-[2] ">New Chat</span>
          </div>
          <div className="flex flex-row gap-3 items-center py-3 mb-3 hover:bg-wellgab-black-1 cursor-pointer">
            <HistoryIcon />
            <span className="flex-[2]">History</span>
            <IconContext.Provider value={{ size: "1.8em" }}>
              <GoChevronRight />
            </IconContext.Provider>
          </div>
        </div>

        <div className="w-full">
          <div className="flex flex-row gap-3 item-center py-3 mb-3 hover:bg-wellgab-black-1 cursor-pointer">
            <SettingIcon />
            <span className="flex-[2]">Settings</span>
          </div>
          <div
            className="flex flex-row gap-3 item-center py-3 mb-3 hover:bg-wellgab-black-1 cursor-pointer"
            onClick={() => logout()}
          >
            <LogoutIcon />
            <span className="flex-[2]">Logout</span>
          </div>
        </div>
      </div>
    </section>
  );
}
