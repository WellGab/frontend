import React from "react";
import Logo from "../icons/logo";

export default function SignedSidebar() {
  return (
    <section className="flex-1">
      <div>
        <Logo /> <span className="text-[#078] dark:text-white">WellGab</span>
      </div>
      <div>
        
      </div>

      <div>
        <p>Settings</p>
        <p>Logout</p>
      </div>
    </section>
  );
}
