import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";
const { persistAtom } = recoilPersist();

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

export const anonChatIdAtom = atom<string>({
  key: "anonChatId",
  default: "empty",
  effects_UNSTABLE: [persistAtom],
});
