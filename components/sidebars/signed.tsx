import React from "react";
import Logo from "../icons/logo";
import Image from "next/image";
import { GoChevronRight, GoChevronDown } from "react-icons/go";
import Edit from "../../assets/svgs/edit.svg";
import History from "../../assets/svgs/history.svg";
import Setting from "../../assets/svgs/setting.svg";
import Logout from "../../assets/svgs/logout2.svg";
import { IconContext } from "react-icons";

export default function SignedSidebar() {
  return (
    <section className="flex-1 h-screen dark:bg-wellgab-black-4 bg-white py-5 px-7">
      <div className="flex flex-row items-center justify-center">
        <Logo />{" "}
        <span className="text-[#078] dark:text-white pl-2">WellGab</span>
      </div>

      <div className="flex flex-col items-start justify-between h-[90%]">
        <div className="pt-14 w-full">
          <div className="flex flex-row gap-3 item-center py-3 mb-3 hover:bg-wellgab-black-1 cursor-pointer">
            <Image src={Edit} alt="new chat icon" className="" />
            <span className="flex-[2] ">New Chat</span>
          </div>
          <div className="flex flex-row gap-3 items-center py-3 mb-3 hover:bg-wellgab-black-1 cursor-pointer">
            <Image src={History} alt="history icon" className="" />
            <span className="flex-[2]">History</span>
            <IconContext.Provider value={{ size: "1.8em" }}>
              <GoChevronRight />
            </IconContext.Provider>
          </div>
        </div>

        <div className="w-full">
          <div className="flex flex-row gap-3 item-center py-3 mb-3 hover:bg-wellgab-black-1 cursor-pointer">
            <Image src={Setting} alt="setting icon" className="" />
            <span className="flex-[2]">Settings</span>
          </div>
          <div className="flex flex-row gap-3 item-center py-3 mb-3 hover:bg-wellgab-black-1 cursor-pointer">
            <Image src={Logout} alt="Logout icon" className="" />
            <span className="flex-[2]">Logout</span>
          </div>
        </div>
      </div>
    </section>
  );
}
