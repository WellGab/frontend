import React, { useRef } from "react";
import ArrowLeft from "../icons/arrow-left";
import ArrowRight from "../icons/arrow-right";
import Ade from "@/assets/imgs/ade.png";
import Sarah from "@/assets/imgs/sarah.png";
import Chris from "@/assets/imgs/chris.png";
import Image from "next/image";

const Hear = () => {
  const ref = useRef<HTMLDivElement>(null);

  const scrollRight = () => {
    if (ref.current) {
      ref.current.scrollLeft += 400;
    }
  };
  const scrollLeft = () => {
    if (ref.current) {
      ref.current.scrollLeft -= 400;
    }
  };
  const contents = [
    {
      text: "I like how fast it i am able to get information regarding my symptoms and the fact that the information are enlightening.",
      name: "Ade",
      role: "Student",
      img: Ade,
    },
    {
      text: "I like how fast it i am able to get information regarding my symptoms and the fact that the information are enlightening.",
      name: "Sarah Napilho",
      role: "Reporter",
      img: Sarah,
    },
    {
      text: "I like how fast it i am able to get information regarding my symptoms and the fact that the information are enlightening.",
      name: "Chris Hamptom",
      role: "Student",
      img: Chris,
    },
    {
      text: "I like how fast it i am able to get information regarding my symptoms and the fact that the information are enlightening.",
      name: "Ngozi Chidera",
      role: "Reporter",
      img: Sarah,
    },
  ];
  return (
    <div className=" pt-7 bg-[#F7F7F7] dark:bg-[#202124] font-plusJakartaSans pb-20">
      <h2 className=" text-5xl bg-clip-text dark:text-transparent dark:bg-hero-gradient font-medium text-center leading-[56px]">
        Join thousands of people <br />
        shaping the future of WellGab
      </h2>
      <p className="text-[#4C4C4C] dark:text-[#B4B4B4] mt-4 text-center">
        Hear what they had to say about WellGab
      </p>
      <div className=" mt-8 px-[6.25rem]">
        <div className="w-full flex justify-end gap-x-10">
          <div
            className="bg-[#078] rounded-full w-[68px] h-[68px] flex items-center justify-center mon-hover"
            onClick={() => scrollLeft()}
          >
            <ArrowLeft />
          </div>
          <div
            className="bg-[#078] rounded-full w-[68px] h-[68px] flex items-center justify-center mon-hover"
            onClick={() => scrollRight()}
          >
            <ArrowRight />
          </div>
        </div>
        <div
          className="  mt-10 overflow-x-scroll scrollbar-hide scroll-smooth"
          ref={ref}
        >
          <div className=" grid grid-flow-col grid-cols-3 gap-x-10 w-max dark:text-[#B4B4B4]">
            {contents.map((item) => (
              <div
                key={item.name}
                className=" rounded-lg bg-white dark:bg-[#0F0F0F] py-8 px-6 w-[30rem]"
              >
                <p className=" text-[#078] dark:text-[#B4B4B4] text-5xl font-inter">
                  “
                </p>
                <p className=" pt-4 text-xl">
                  I like how fast it i am able to get information regarding my
                  symptoms and the fact that the information are enlightening.
                </p>
                <div className="mt-12 flex gap-x-4">
                  <Image
                    src={item.img}
                    alt={item.name}
                    className=" w-12 h-12 rounded-full overflow-hidden"
                  />
                  <div>
                    <p className=" font-medium text-xl">{item.name}</p>
                    <p>{item.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hear;
