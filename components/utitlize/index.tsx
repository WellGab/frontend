import React from "react";
import robot from "../../assets/imgs/robot.png";
import Image from "next/image";
import Link from "next/link";
import { TryWellGab } from "../button";

const Utilize = () => {
  return (
    <section className="bg-[#F7F7F7] dark:bg-[#202124] font-plusJakartaSans py-20 px-4 md:px-8 xl:px-[6.25rem]">
      <div className="w-full rounded-xl relative py-20 pl-12 md:pl-44 xl:pl-64 bg-bg-utilize pr-12 xl:pr-32">
        <Image
          src={robot}
          alt="robot"
          className="absolute w-[160px] md:w-[180px] xl:w-[241px] -left-[60px] md:left-[16px] xl:left-[30px] -top-[67px] "
        />
        <div className=" flex flex-col md:flex-row items-center justify-between">
          <div className=" text-white">
            <p className="text-[28px] xl:text-[40px]  font-semibold text-center md:text-left">
              Utilise the power of AI.
            </p>
            <p className="pt-6 xl:pt-0 text-base xl:text-xl">
              Use WellGab to get up to date and personalized <br />
              insights to your symptoms and diagnosis.
            </p>
          </div>
          <TryWellGab />
        </div>
      </div>
    </section>
  );
};

export default Utilize;
