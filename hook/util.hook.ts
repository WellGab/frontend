import React, { useEffect, useRef } from "react";

export const useScrollToBottom = (factor: React.RefObject<HTMLDivElement>) => {
  const ref: React.LegacyRef<HTMLDivElement> | undefined = useRef(null);

  const scrollToBottom = () => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (!factor.current) return;

    let resizeObserver = new ResizeObserver(() => {
      scrollToBottom();
    });

    resizeObserver.observe(factor.current);
  });

  return ref;
};
