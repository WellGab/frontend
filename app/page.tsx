"use client";
import LogoGreen from "@/components/icons/logo-green";
import React from "react";

export default function Home() {
  React.useEffect(() => {
    if (
      localStorage.theme === "dark" ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);
  const toggleTheme = () => {
    if (window !== undefined) {
      if (localStorage.theme == "dark") {
        console.log("yeah");
        localStorage.theme = "light";
        document.documentElement.classList.add("dark");
      } else {
        localStorage.theme = "dark";
        document.documentElement.classList.remove("dark");
      }
    }
  };

  const system = () => {
    if (window !== undefined) {
      localStorage.removeItem("theme");
    }
  };
  return (
    <main className=" font-bold text-5xl text-[#078] flex items-center justify-center min-h-screen font-mono dark:bg-black">
      <p
        className=" text-black dark:text-white font-bold text-lg fixed top-10 right-10"
        onClick={() => toggleTheme()}
      >
        Toggle Theme
      </p>
      <p
        className=" text-black dark:text-white font-bold text-lg fixed top-14 right-10"
        onClick={() => system()}
      >
        System
      </p>
      WellGab <LogoGreen />
    </main>
  );
}
