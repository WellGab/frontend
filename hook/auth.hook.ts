import $http from "@/http/fetcher";
import { signupType, socialAuthType } from "@/utils/validation/auth.zod";
import { toast } from "react-hot-toast";
import { useMutation } from "react-query";
import { useRouter } from "next/navigation";
import { useRecoilValue, useSetRecoilState } from "recoil";
import userAtom from "@/atoms/user.atom";
import { jwtDecode } from "jwt-decode";

export function useLogin() {
  const router = useRouter();

  const setUser = useSetRecoilState(userAtom);
  return useMutation(
    (login: signupType) => $http.post("/api/v1/auth/login", login),
    {
      onSuccess: (data) => {
        setUser(data.data?.data);
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
        setUser(data.data?.data);
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
        setUser(data.data?.data);
        toast.success(data.data.message);
        router.push("/signed/chat");
      },
      onError: (error: any) => {
        toast.error(error?.response?.data?.detail ?? error.message);
      },
    }
  );
}

export function useCheckAuth() {
  const user = useRecoilValue(userAtom);
  const checkJwtExpiry = (token: string) => {
    const exp = jwtDecode(token)?.exp;
    if (!exp) {
      return false;
    }
    if (Date.now() >= exp * 1000) {
      return false;
    }
    return true;
  };

  console.log(user?.token, "token");
  const checkAuth = () => {
    if (user?.token) {
      return checkJwtExpiry(user?.token);
    }
    return false;
  };

  const isAuthenticated = checkAuth();

  return isAuthenticated;
}
