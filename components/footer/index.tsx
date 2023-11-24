import React from "react";
import LogoWhite from "../icons/logo-white";

const Footer = () => {
  const content = ["Home", "Features", "Contact", "Legal", "Twitter"];
  return (
    <footer className="bg-[#0F0F0F] px-8 md:px-[6.25rem] py-6 flex flex-col md:flex-row md:items-center justify-between text-white gap-y-10">
      <div className=" flex items-center gap-x-2">
        <LogoWhite /> <span className=" font-inter font-bold">WellGab</span>
      </div>
      <div className=" text-sm font-plusJakartaSans flex gap-x-5 items-center">
        {content.map((item) => (
          <p key={item}>{item}</p>
        ))}
      </div>
    </footer>
  );
};

export default Footer;
