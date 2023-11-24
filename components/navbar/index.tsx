import React, { useState } from "react";
import Logo from "../icons/logo";
import MenuLines from "../icons/lines";

const NavBar = () => {
  const [dropDown, setDropDown] = useState(false);

  return (
    <section className="relative">
      <nav className=" bg-white dark:bg-[#0F0F0F] py-4 px-8 lg:px-[100px] flex justify-between ">
        <div className=" flex items-center gap-x-2 cursor-pointer">
          <Logo /> <span className="text-[#078] dark:text-white">WellGab</span>
        </div>

        <div className=" font-workSans font-medium py-[10px] px-5 dark:bg-[#171719] rounded-lg hidden lg:flex gap-x-10 text-sm xl:text-base ">
          <p>Features</p>
          <p>How it works</p>
        </div>

        <button className="bg-[#078] font-sans text-sm xl:text-lg rounded-lg px-6 text-white hidden lg:block">
          Get Started
        </button>

        <div
          className=" dark:bg-[#171719] border-button-nav p-4 rounded-lg mr-16 lg:hidden mon-hover"
          onClick={() => setDropDown(!dropDown)}
        >
          <MenuLines />
        </div>
      </nav>
      <div
        className={`absolute top-full w-full lg:hidden z-10 transition-[max-height] duration-300 ease-out overflow-hidden text-center  bg-white dark:bg-[#0F0F0F]  ${
          dropDown ? "max-h-44" : "max-h-0"
        }`}
      >
        <div className="space-y-5 py-5 w-full">
          <p>Features</p>
          <p>How it works</p>
          <button className="bg-[#078] font-sans text-sm xl:text-lg rounded-lg px-6 text-white py-3">
            Get Started
          </button>
        </div>
      </div>
    </section>
  );
};

export default NavBar;
