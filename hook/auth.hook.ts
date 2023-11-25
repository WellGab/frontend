import $http from "@/http/fetcher";
import { signupType, socialAuthType } from "@/utils/validation/auth.zod";
import { toast } from "react-hot-toast";
import { useMutation } from "react-query";
import { useRouter } from "next/navigation";
import { useSetRecoilState } from "recoil";
import userAtom from "@/atoms/user.atom";

export function useLogin() {
  const router = useRouter();

  const setUser = useSetRecoilState(userAtom);
  return useMutation(
    (login: signupType) => $http.post("/api/v1/auth/login", login),
    {
      onSuccess: (data) => {
        setUser(data.data);
        toast.success(data.data.message);
        router.push("/signed/chat");
      },
      onError: (error: any) => {
        toast.error(error?.response?.data?.detail ?? error.message);
      },
    }
  );
}

export function useSignup() {
  const router = useRouter();
  const setUser = useSetRecoilState(userAtom);
  return useMutation(
    (signup: signupType) => $http.post("/api/v1/auth/sign-up", signup),
    {
      onSuccess: (data) => {
        setUser(data.data);
        toast.success(data.data.message);
        router.push("/signed/chat");
      },
      onError: (error: any) => {
        toast.error(error?.response?.data?.detail ?? error.message);
      },
    }
  );
}

export function useSocialAuth() {
  const router = useRouter();
  const setUser = useSetRecoilState(userAtom);
  return useMutation(
    (tokenData: socialAuthType) =>
      $http.post("/api/v1/auth/social-auth", tokenData),
    {
      onSuccess: (data) => {
        setUser(data.data);
        toast.success(data.data.message);
        router.push("/signed/chat");
      },
      onError: (error: any) => {
        toast.error(error?.response?.data?.detail ?? error.message);
      },
    }
  );
}
