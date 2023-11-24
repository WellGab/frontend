import SignedSidebar from "@/components/sidebars/signed";
import React from "react";

export default function page(props: {}) {
  return (
    <main className="flex flex-row gap-4">
      <SignedSidebar />
      <div className="flex-[3]">content</div>
      
    </main>
  );
}
