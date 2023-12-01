"use client";

interface categorie {
  id: string;
  name: string;
  description: string;
  items: any[];
}

import { createContext, useContext, useReducer } from "react";
import { ArrayAction, ArrayReducer } from "./Reducers/ArrayReducer";

const CategorieContext = createContext([]);

const CategorieDispatchContext = createContext<(action: ArrayAction) => void>(
  () => {}
);

export function CategorieProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch]: any = useReducer(ArrayReducer, intialState);

  return (
    <CategorieContext.Provider value={state}>
      <CategorieDispatchContext.Provider value={dispatch}>
        {children}
      </CategorieDispatchContext.Provider>
    </CategorieContext.Provider>
  );
}

export function useCategorie() {
  return useContext(CategorieContext);
}

export function useCategorieDispatch() {
  return useContext(CategorieDispatchContext);
}

const intialState: categorie[] = [];
