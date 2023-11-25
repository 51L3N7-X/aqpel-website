"use client";

import { createContext, useContext, useReducer } from "react";
import { Reducer } from "./Reducers/ObjectReducer";

const MenuContext = createContext(null);

const MenuDispatchContext = createContext(null);

export function MenuProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch]: any[] = useReducer(Reducer, intialState);

  return (
    <MenuContext.Provider value={state}>
      <MenuDispatchContext.Provider value={dispatch}>
        {children}
      </MenuDispatchContext.Provider>
    </MenuContext.Provider>
  );
}

export function useMenu() {
  return useContext(MenuContext);
}

export function useMenuDispatch() {
  return useContext(MenuDispatchContext);
}

const intialState = {};
