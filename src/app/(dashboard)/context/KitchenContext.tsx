"use client";

import { createContext, useContext, useReducer } from "react";
import { ObjectAction, Reducer } from "./Reducers/ObjectReducer";
import { kitchen } from "../types";

const KitchenContext = createContext({});

const KitchenDisptachContext = createContext<(action: ObjectAction) => void>(
  () => {}
);

export function KitchenProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch]: any[] = useReducer(Reducer, intialState);

  return (
    <KitchenContext.Provider value={state}>
      <KitchenDisptachContext.Provider value={dispatch}>
        {children}
      </KitchenDisptachContext.Provider>
    </KitchenContext.Provider>
  );
}

export function useKitchen() {
  return useContext(KitchenContext);
}

export function useKitchenDispatch() {
  return useContext(KitchenDisptachContext);
}

const intialState = {};
