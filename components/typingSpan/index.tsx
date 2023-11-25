"use client";
import React, { useEffect, useRef, useState } from "react";

const TypingSpan = ({ text, type }: { text: string; type: boolean }) => {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (type) {
      let i = 0;
      let timeout: any = null;

      const typeMessage = () => {
        if (i < text.length) {
          if (ref.current) {
            ref.current.innerHTML += text.charAt(i);
          }
          i++;
          timeout = setTimeout(typeMessage, 30);
        }
      };
      typeMessage();

      return () => {
        clearTimeout(timeout);
      };
    } else {
      if (ref.current) {
        ref.current.innerHTML = text;
      }
    }
  }, [text, type]);

  return <span ref={ref}></span>;
};

export default TypingSpan;
