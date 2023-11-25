"use client";
import { useEffect } from "react";
import { redirect } from "next/navigation";
import { useCheckAuth } from "@/hook/auth.hook";
import toast from "react-hot-toast";

export default function withAuth(Component: any) {
  return function IsAuth(props: any) {
    const auth = useCheckAuth();
    useEffect(() => {
      if (!auth) {
        toast.error("Please log in");
        return redirect("/auth/login");
      }
    }, []); //eslint-disable-line

    if (!auth) {
      return null;
    }

    return <Component {...props} />;
  };
}
