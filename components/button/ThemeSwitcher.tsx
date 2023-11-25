"use client";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import MoonIcon from "../icons/moon";
import SunIcon from "../icons/sun";

export const ThemeSwitcher = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <button
      className={`w-fit fixed z-30 right-5 top-5 lg:top-2 hover:scale-110 active:scale-100 duration-200`}
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
    >
      {theme === "light" ? <MoonIcon /> : <SunIcon />}
    </button>
  );
};
