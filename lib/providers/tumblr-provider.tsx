"use client";

import { type ReactNode, createContext, useRef, useContext } from "react";
import { useStore } from "zustand";

import { type TumblrStore, createTumblrStore } from "@lib/stores/tumblr-store";

export type TumblrStoreApi = ReturnType<typeof createTumblrStore>;

export const TumblrStoreContext = createContext<TumblrStoreApi | undefined>(
  undefined
);

export interface TumblrStoreProviderProps {
  children: ReactNode;
}

export const TumblrStoreProvider = ({ children }: TumblrStoreProviderProps) => {
  const storeRef = useRef<TumblrStoreApi>();
  if (!storeRef.current) {
    storeRef.current = createTumblrStore();
  }

  return (
    <TumblrStoreContext.Provider value={storeRef.current}>
      {children}
    </TumblrStoreContext.Provider>
  );
};

export const useTumblrStore = <T,>(selector: (store: TumblrStore) => T): T => {
  const tumblrStoreContext = useContext(TumblrStoreContext);

  if (!TumblrStoreContext) {
    throw new Error(`useTumblrStore must be used within TumblrStoreProvider`);
  }

  return useStore(tumblrStoreContext!, selector);
};
