import $http from "@/http/fetcher";
import toast from "react-hot-toast";
import { useMutation } from "react-query";

export function useSubscribe() {
  return useMutation(
    (data: { email: string }) => $http.post(`auth/subscribe`, data),

    {
      onSuccess: (data) => {
        toast.success(data.data.message);
      },
      onError: (error: any) => {
        toast.error(error?.response?.data?.detail ?? error.message);
      },
    }
  );
}
