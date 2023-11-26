import React, { useEffect, useRef } from "react";

export const useScrollToBottom = (factor: any) => {
  const ref: React.LegacyRef<HTMLDivElement> | undefined = useRef(null);

  const scrollToBottom = () => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [factor]);
  return ref;
};
