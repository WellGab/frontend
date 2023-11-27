import Link from "next/link";
import React from "react";

const Button = (
  props: React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  >
) => {
  return <button {...props}>{props.children}</button>;
};

export default Button;

export const TryWellGab = () => {
  return (
    <Link href={"/chat"}>
      <button className=" mt-12 bg-[#078] w-[250px] md:w-[320px] h-[50px] md:h-[60px] rounded-lg md:text-lg font-sans text-[#F1F3F6] mon-hover">
        TRY WELLGAB FOR FREE
      </button>
    </Link>
  );
};
