"use client";
import { useSubscribe } from "@/hook/subscribe.hook";
import React, { useState } from "react";
import { PageLoader } from "../loader";

const Subscribe = () => {
  const [email, setEmail] = useState("");
  const { mutate, isLoading } = useSubscribe();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (email.length > 0) {
      mutate(
        { email },
        {
          onSuccess: () => {
            setEmail("");
          },
        }
      );
    }
  };
  return (
    <section className=" pt-5 bg-[#F5FAFA] dark:bg-[#202124] font-plusJakartaSans pb-20">
      {isLoading ? <PageLoader /> : null}
      <h2 className=" text-5xl bg-clip-text dark:text-transparent dark:bg-hero-gradient font-medium text-center leading-[56px]">
        Be the first to know
      </h2>
      <p className="text-[#4C4C4C] dark:text-[#B4B4B4] mt-4 text-center">
        Subscribe to out newsletter and be the first to know about new updates
        <br />
        and news, but no spam, scouts honor!
      </p>

      <form
        onSubmit={handleSubmit}
        className=" mt-14 rounded-2xl bg-white dark:bg-[#0F0F0F] py-3 px-4 w-[95vw] md:w-[70vw] xl:w-[50vw] flex justify-between items-center mx-auto"
      >
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Your email address"
          className=" placeholder:text-[#4C4C4C] placeholder:dark:text-[#B4B4B4] bg-transparent outline-none border-none py-2 w-[80%]"
        />

        <button
          className="  bg-[#078] px-6 py-4 rounded-lg text-lg font-sans text-[#F1F3F6]"
          type="submit"
        >
          Subscribe
        </button>
      </form>
    </section>
  );
};

export default Subscribe;
