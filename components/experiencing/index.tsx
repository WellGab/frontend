import Image from "next/image";
import React from "react";
import Exp1 from "@/assets/imgs/exp1.png";
import Exp2 from "@/assets/imgs/exp2.png";
import Exp3 from "@/assets/imgs/exp3.png";

const Experiencing = () => {
  return (
    <div className="bg-white dark:bg-[#202124] pt-14 font-plusJakartaSans pb-20 px-44">
      <h2 className=" text-center dark:text-transparent bg-hero-gradient bg-clip-text text-5xl font-medium">
        Experiencing any symptom? <br /> Just ask a question.
      </h2>
      <p className="text-[#4C4C4C] dark:text-[#B4B4B4] mt-4 text-center">
        WellGab is the hub for all your symptom and
        <br /> diagnosis guidance.
      </p>

      <div className=" mt-16  ">
        <Image src={Exp1} alt="accessibility" className="w-[100%]" />
        <div className="mx-auto flex gap-x-6 w-full">
          <Image src={Exp2} alt="ask" className="w-[50%]" />
          <Image src={Exp3} alt="get" className="w-[50%]" />
        </div>
      </div>
    </div>
  );
};

export default Experiencing;
