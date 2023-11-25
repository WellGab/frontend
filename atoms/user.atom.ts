import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";
const { persistAtom } = recoilPersist();

export type UserAtom = {
  token: string;
  user_id: string;
};

export default atom<UserAtom>({
  key: "user-login",
  default: {
    user_id: "",
    token: "",
  } as UserAtom,
  effects_UNSTABLE: [persistAtom],
});
