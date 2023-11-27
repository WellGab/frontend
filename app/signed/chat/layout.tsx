import SignedSidebar from "@/components/sidebars/signed";
import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="">
      <SignedSidebar />
      <section className="md:ml-[250px] ml-[45px] min-h-screen bg-[#F5FAFA] dark:bg-[#202124]">
        {children}
      </section>
    </main>
  );
};

export default Layout;
