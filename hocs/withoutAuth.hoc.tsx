"use client";
import { useEffect } from "react";
import { redirect } from "next/navigation";
import { useCheckAuth } from "@/hook/auth.hook";
import toast from "react-hot-toast";

export default function withoutAuth(Component: any) {
  return function IsAuth(props: any) {
    const auth = useCheckAuth();
    useEffect(() => {
      if (auth) {
        return redirect("/signed/chat");
      }
    }, []); //eslint-disable-line

    return <Component {...props} />;
  };
}
