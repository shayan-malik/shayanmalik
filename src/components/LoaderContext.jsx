"use client";
import { createContext, useContext, useState } from "react";

const Ctx = createContext({ ready: false, setReady: () => {} });

export function LoaderProvider({ children }) {
  const [ready, setReady] = useState(false);
  return <Ctx.Provider value={{ ready, setReady }}>{children}</Ctx.Provider>;
}

export const useReady = () => useContext(Ctx).ready;
export const useSetReady = () => useContext(Ctx).setReady;