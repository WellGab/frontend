import React from "react";
import AI from "@/assets/svgs/ai.svg";
import HeroImg from "@/assets/imgs/hero-img.png";
import Image from "next/image";
import Link from "next/link";

const Hero = () => {
  return (
    <section className=" py-[100px] bg-[#F5FAFA] dark:bg-[#202124] h-[150vw] md:h-[90vw] lg:h-[75vw] xl:h-[65vw] 2xl:h-[55vw] text-center relative font-plusJakartaSans">
      <div className=" text-4xl md:text-5xl lg:text-6xl xl:text-[64px] font-medium  text-center">
        <h1 className=" flex items-center gap-x-[80px] md:gap-x-[100px] lg:gap-x-[139px] justify-center  relative w-max mx-auto">
          <span className=" dark:text-transparent bg-clip-text bg-hero-gradient">
            Your
          </span>
          <div className=" absolute right-[40px] md:right-[115px] lg:right-[210px] xl:right-[240px]">
            <Image
              priority
              src={AI}
              alt="ai"
              className="w-[60%] md:w-[70%] lg:w-[90%] xl:w-[100%]"
            />
          </div>

          <span className=" dark:text-transparent bg-clip-text bg-hero-gradient">
            powered
          </span>
        </h1>
        <h1 className=" dark:text-transparent bg-clip-text bg-hero-gradient pb-3">
          symptom & diagnosis guidance
        </h1>
      </div>
      <p className=" text-base lg:text-lg xl:text-xl text-[#B4B4B4] pt-4 px-4 lg:px-0">
        With an AI-Powered Symptom & Diagnosis Guidance at your fingertips; Your
        first step towards informed wellness
      </p>
      <Link href={"/chat"}>
        <button className=" mt-12 bg-[#078] w-[320px] h-[60px] rounded-lg text-lg font-sans text-[#F1F3F6] mon-hover">
          TRY WELLGAB FOR FREE
        </button>
      </Link>

      <div className=" mx-auto flex justify-center -bottom-14  absolute w-full">
        <Image
          src={HeroImg}
          alt="hero image"
          className="w-[80%] md:w-[70%] lg:w-[60%] xl:w-[60%]  2xl:w-[50%]"
        />
      </div>
    </section>
  );
};

export default Hero;
