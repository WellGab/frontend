"use client";
import Hero from "@/components/hero";
import NavBar from "@/components/navbar";
import { isDark } from "@/utils";
import React from "react";

export default function Home() {
  React.useEffect(() => {
    if (isDark()) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);
  const toggleTheme = () => {
    if (window !== undefined) {
      if (localStorage.theme == "dark") {
        localStorage.theme = "light";
        document.documentElement.classList.remove("dark");
      } else {
        localStorage.theme = "dark";
        document.documentElement.classList.add("dark");
      }
    }
  };

  const system = () => {
    if (window !== undefined) {
      localStorage.removeItem("theme");
    }
  };
  return (
    <main className=" min-h-screen  text-primary">
      <p
        className=" text-black dark:text-white font-bold text-lg fixed bottom-5 right-10 cursor-pointer z-[1]"
        onClick={() => toggleTheme()}
      >
        Toggle
      </p>

      <NavBar />
      <Hero />
      <div className=" bg-[#F7F7F7] dark:bg-[#0F0F0F] h-[20vh]"></div>
    </main>
  );
}
