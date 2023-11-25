"use client";
import Experiencing from "@/components/experiencing";
import Footer from "@/components/footer";
import Hear from "@/components/hear";
import Hero from "@/components/hero";
import HowItWorks from "@/components/how-it-works";
import NavBar from "@/components/navbar";
import Subscribe from "@/components/subscribe";
import Utilize from "@/components/utitlize";
import React from "react";

export default function Home() {
  return (
    <main className=" min-h-screen  text-primary ">
      <NavBar showLinks />
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
