import React from "react";
import AI from "@/assets/svgs/ai.svg";
import HeroImg from "@/assets/imgs/hero-img.png";
import Image from "next/image";

const Hero = () => {
  return (
    <section className=" py-[100px] bg-[#F5FAFA] dark:bg-[#202124] h-[955px] text-center relative font-plusJakartaSans">
      <div className=" text-[64px] font-medium  text-center">
        <h1 className=" flex items-center gap-x-[139px] justify-center  relative w-max mx-auto">
          <span className=" dark:text-transparent bg-clip-text bg-hero-gradient">
            Your
          </span>
          <div className=" absolute right-[240px]">
            <Image priority src={AI} alt="ai" />
          </div>

          <span className=" dark:text-transparent bg-clip-text bg-hero-gradient">
            powered
          </span>
        </h1>
        <h1 className=" dark:text-transparent bg-clip-text bg-hero-gradient">
          symptom & diagnosis guidance
        </h1>
      </div>
      <p className=" text-xl text-[#B4B4B4]">
        With an AI-Powered Symptom & Diagnosis Guidance at your fingertips; Your
        first step towards informed wellness
      </p>
      <button className=" mt-12 bg-[#078] w-[320px] h-[60px] rounded-lg text-lg font-sans text-[#F1F3F6]">
        TRY WELLGAB FOR FREE
      </button>

      <div className=" mx-auto flex justify-center -bottom-14  absolute w-full">
        <Image src={HeroImg} alt="hero image" className="w-[50%] " />
      </div>
    </section>
  );
};

export default Hero;
