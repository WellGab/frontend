import React from "react";
import Logo from "../icons/logo";
import Link from "next/link";

const Footer = () => {
  const content = ["Home", "Features", "Contact", "Legal", "Twitter"];
  return (
    <footer className="bg-white dark:bg-[#0F0F0F] px-8 md:px-[6.25rem] py-6 flex flex-col md:flex-row md:items-center justify-between  gap-y-10">
      <Link href={"/"}>
        <div className=" flex items-center gap-x-2">
          <Logo />{" "}
          <span className=" font-inter font-bold text-[#078]">WellGab</span>
        </div>
      </Link>
      <div className=" text-sm font-plusJakartaSans flex gap-x-5 items-center">
        {content.map((item) => (
          <p key={item}>{item}</p>
        ))}
      </div>
    </footer>
  );
};

export default Footer;
