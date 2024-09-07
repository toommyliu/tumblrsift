import { createStore } from "zustand/vanilla";
import { TumblrUserInfo } from "../tumblr";

export const defaultInitState: TumblrState = {
  consumerKey: "",
  consumerSecret: "",
  token: "",
  tokenSecret: "",
  userInfo: null,
};

export function createTumblrStore(initState: TumblrState = defaultInitState) {
  return createStore<TumblrStore>((set) => ({
    ...initState,

    setConsumerKey: (consumerKey) => set({ consumerKey }),
    setConsumerSecret: (consumerSecret) => set({ consumerSecret }),
    setToken: (token) => set({ token }),
    setTokenSecret: (tokenSecret) => set({ tokenSecret }),
    setUserInfo: (userInfo) => set({ userInfo }),
  }));
}

export type TumblrStore = TumblrActions & TumblrState;

export type TumblrActions = {
  setConsumerKey: (consumerKey: string) => void;
  setConsumerSecret: (consumerSecret: string) => void;
  setToken: (token: string) => void;
  setTokenSecret: (tokenSecret: string) => void;
  setUserInfo: (userInfo: TumblrUserInfo | null) => void;
};

export type TumblrState = {
  consumerKey: string;
  consumerSecret: string;
  token: string;
  tokenSecret: string;
  userInfo: TumblrUserInfo | null;
};
