"use client";
import { useSocialAuth } from "@/hook/auth.hook";
import { fetcher } from "@/http/fetcher";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const Page = () => {
  const { mutate } = useSocialAuth();
  const router = useRouter();
  useEffect(() => {
    (async () => {
      const res = await fetcher("/api/auth/protected");
      if (res?.token) {
        console.log(res);
        mutate(res, {
          onError: () => {
            router.push("/auth/login");
          },
        });
      }
    })();
  }, []);
  return <div>Page</div>;
};

export default Page;
