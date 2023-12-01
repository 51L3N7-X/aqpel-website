"use client";

import { createContext, useContext, useReducer } from "react";
import { ObjectAction, Reducer } from "./Reducers/ObjectReducer";
import { menu } from "../types";

const MenuContext = createContext({});

const MenuDispatchContext = createContext<(action: ObjectAction) => void>(
  () => {}
);

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
