"use client";
import { PageLoader } from "@/components/loader";
import { useSocialAuth } from "@/hook/auth.hook";
import { localFetcher } from "@/http/fetcher";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const Page = () => {
  const { mutate } = useSocialAuth();
  const router = useRouter();
  useEffect(() => {
    (async () => {
      const res = await localFetcher("/api/auth/protected");
      if (res?.token) {
        mutate(res, {
          onError: () => {
            router.push("/auth/login");
          },
        });
      } else {
        router.push("/auth/login");
      }
    })();
  }, []); // eslint-disable-line
  return <PageLoader />;
};

export default Page;
