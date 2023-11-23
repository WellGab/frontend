import React from "react";
import Logo from "../icons/logo";

const NavBar = () => {
  return (
    <nav className=" bg-white dark:bg-[#0F0F0F] py-4 px-[100px] flex justify-between">
      <div className=" flex items-center gap-x-2 cursor-pointer">
        <Logo /> <span className="text-[#078] dark:text-white">WellGab</span>
      </div>

      <div className=" font-workSans font-medium py-[10px] px-5 dark:bg-[#171719] rounded-lg flex gap-x-10 text-sm xl:text-base">
        <p>Features</p>
        <p>How it works</p>
      </div>

      <button className="bg-[#078] font-sans text-sm xl:text-lg rounded-lg px-6 text-white">
        Get Started
      </button>
    </nav>
  );
};

export default NavBar;
