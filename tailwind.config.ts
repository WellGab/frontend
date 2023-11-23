import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "hero-gradient":
          "radial-gradient(70.71% 70.71% at 50% 50%, #FFF 0%, rgba(255, 255, 255, 0.43) 100%)",
        "bg-exp1": "url('../assets/imgs/exp1.png')",
        "bg-text": "radial-gradient(70.71% 70.71% at 50% 50%, rgba(255, 255, 255, 0.90) 0%, rgba(255, 255, 255, 0.45) 100%)"
      },
      colors: {
        "wellgab-green": "#078",
        "wellgab-black-1": "#191919",
        "wellgab-black-2": "#4C4C4C",
        "wellgab-black-3": "#24252B",
        "wellgab-white-1": "#F1F3F6",
        "wellgab-white-2": "#b4b4b4",
      },
      fontFamily: {
        workSans: ["Work Sans"],
        plusJakartaSans: ["Plus Jakarta Sans"],
        inter: ["Inter"],
      },
    },
  },
  plugins: [require("tailwind-scrollbar-hide")],
};
export default config;
