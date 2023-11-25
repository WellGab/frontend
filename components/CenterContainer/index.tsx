import React from "react";

// create a component that centers the page content
// and adds a max width
export default function CenteredPage({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <main className="flex flex-col items-center justify-center flex-1 px-20 text-center max-w-screen-md">
        {children}
      </main>
    </div>
  );
}
