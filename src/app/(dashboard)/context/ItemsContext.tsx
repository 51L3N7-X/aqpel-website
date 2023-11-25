"use client";

interface item {
  name: string;
  price: string;
  description: string;
  calories: string;
  people: string;
  new: boolean;
  special: boolean;
  imageUrl: string;
}

import { createContext, useContext, useReducer } from "react";
import { ItemsReducer } from "./Reducers/ItemsReducer";

const ItemsContext = createContext({});

const ItemsDispatchContext = createContext(null);

export function ItemsProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch]: any = useReducer(ItemsReducer, intialState);

  return (
    <ItemsContext.Provider value={state}>
      <ItemsDispatchContext.Provider value={dispatch}>
        {children}
      </ItemsDispatchContext.Provider>
    </ItemsContext.Provider>
  );
}

export function useItems() {
  return useContext(ItemsContext);
}

export function useItemsDispatch() {
  return useContext(ItemsDispatchContext);
}

const intialState: item[] = [];
