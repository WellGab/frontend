"use client";
import Experiencing from "@/components/experiencing";
import Footer from "@/components/footer";
import Hear from "@/components/hear";
import Hero from "@/components/hero";
import HowItWorks from "@/components/how-it-works";
import NavBar from "@/components/navbar";
import Subscribe from "@/components/subscribe";
import Utilize from "@/components/utitlize";
import { isDark } from "@/utils";
import { useUser } from "@auth0/nextjs-auth0/client";

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

  const { user, checkSession } = useUser();

  const x = async () => {
    // const token = await getAccessToken();
    // console.log(token);
  };

  return (
    <main className=" min-h-screen  text-primary">
      <NavBar />
      <Hero />
      <HowItWorks />
      <Experiencing />
      <Hear />
      <Utilize />
      <Subscribe />
      <Footer />
    </main>
  );
}
