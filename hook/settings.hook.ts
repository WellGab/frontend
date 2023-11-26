import { useMutation, useQuery } from "react-query";
import { useAuthAxios } from "./axios.hook";

export interface SettingsType {
  ninety_days_chat_limit: boolean;
  text_size: string;
  display: string;
}

// get settings
export function useGetSettings() {
  const axiosInstance = useAuthAxios();
  return useQuery("settings", () => axiosInstance.get("/auth/user/setting"));
}

// update settings
export function useUpdateSettings() {
  
  const axiosInstance = useAuthAxios();
  return useMutation((data: SettingsType) =>
    axiosInstance.patch("/auth/user/setting", data),
  );
}

// delete account
export function useDeleteAccount() {
  const axiosInstance = useAuthAxios();
  return useMutation((data: { password: string }) =>
    axiosInstance.post("/auth/user/delete", data),
  );
}
