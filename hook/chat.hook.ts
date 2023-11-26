import { toast } from "react-hot-toast";
import { useMutation, useQuery } from "react-query";
import { useAuthAxios } from "./axios.hook";
import { useSetRecoilState } from "recoil";
import chatAtom from "@/atoms/chat.atom";

export function useGetChats() {
  const axiosInstance = useAuthAxios();
  const setChats = useSetRecoilState(chatAtom);
  return useQuery("chats", async () => await axiosInstance.get("chats"), {
    onSuccess: (data) => {
      setChats(data?.data?.data);
    },
  });
}

export function useGetChat(chatId: string) {
  const axiosInstance = useAuthAxios();
  return useQuery(
    "chat",
    async () => await axiosInstance.get("chats/" + chatId),
    {
      enabled: false,
    }
  );
}

export function useCreateChat() {
  const axiosInstance = useAuthAxios();

  return useMutation(
    (data: { topic: string }) => axiosInstance.post("chats", data),
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

export function useSendChat(chatId: string) {
  const axiosInstance = useAuthAxios();

  return useMutation(
    (data: { message: string }) =>
      axiosInstance.post(`chats/${chatId}/messages`, data),
    {
      onError: (error: any) => {
        toast.error(error?.response?.data?.detail ?? error.message);
      },
    }
  );
}
