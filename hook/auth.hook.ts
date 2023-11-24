import $http from "@/http/fetcher";
import { signupType } from "@/utils/validation/auth.zod";
import { toast } from "react-hot-toast";
import { useMutation } from "react-query";
import { useRouter } from "next/navigation";

export function useLogin() {
  const router = useRouter();
  return useMutation(
    (login: signupType) => $http.post("/api/v1/auth/login", login),
    {
      onSuccess: (data) => {
        localStorage.setItem("token", data.data.token);
        toast.success(data.data.message);
        router.push("/signed/chat");
      },
      onError: (error: any) => {
        toast.error(error?.response?.data?.detail ?? error.message);
      },
    },
  );
}

export function useSignup() {
  const router = useRouter();
  return useMutation(
    (signup: signupType) => $http.post("/api/v1/auth/sign-up", signup),
    {
      onSuccess: (data) => {
        localStorage.setItem("token", data.data.token);
        toast.success(data.data.message);
        router.push("/signed/chat");
      },
      onError: (error: any) => {
        toast.error(error?.response?.data?.detail ?? error.message);
      },
    },
  );
}
