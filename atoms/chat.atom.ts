import { atom } from "recoil";

export type Chat = {
  id: string;
  topic: string;
  created_at: string;
};

export default atom<Chat[]>({
  key: "chats",
  default: [] as Chat[],
});

export const activeChatIdAtom = atom<string>({
  key: "activeChatId",
  default: "",
});
