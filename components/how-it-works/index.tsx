import React from "react";

const HowItWorks = () => {
  const contents = [
    {
      no: 1,
      text: "Input your symptom",
      subtext:
        "Input your symptoms into the user-friendly interface of the app; describe your symptoms, providing details such as severity, duration and any relevant information and press “send”",
    },
    {
      no: 2,
      text: "AI analysis and insights",
      subtext:
        "Our advanced AI algorithms analyze your symptoms, considering a multitude of factors answers you supply and then generates personalized health insights based on your unique symptoms profile.",
    },
    {
      no: 3,
      text: "Traige and next steps",
      subtext:
        "After accessing the severity of your symptoms using our triage system, the app guides you on the recommended next steps - whether it's immediate attention, scheduling a doctor's appointment or self-care measures.",
    },
  ];
  return (
    <section
      className=" bg-[#F7F7F7] dark:bg-[#0F0F0F] pt-[120px] font-plusJakartaSans pb-20"
      id="how-it-works"
    >
      <h2 className=" text-5xl bg-clip-text dark:text-transparent dark:bg-hero-gradient font-medium text-center">
        How it works
      </h2>

      <div className=" grid  md:grid-cols-2 lg:grid-cols-3 mt-14 px-8 xl:px-[6.25rem] gap-x-10 gap-y-10">
        {contents.map((content) => (
          <div
            key={content.no}
            className="border border-[#078] rounded-lg bg-white dark:bg-[#171719] p-6"
          >
            <div className=" w-[68px] h-[68px] rounded-full flex items-center justify-center bg-[#078] text-[28px] font-plusJakartaSans text-white mx-auto font-bold">
              {content.no}
            </div>
            <p className=" mt-8 bg-hero-gradient dark:text-transparent bg-clip-text text-2xl xl:text-[28px] text-center">
              {content.text}
            </p>
            <p className=" mt-4 text-[#4C4C4C] dark:text-[#B4B4B4] text-base xl:text-xl">
              {content.subtext}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HowItWorks;
