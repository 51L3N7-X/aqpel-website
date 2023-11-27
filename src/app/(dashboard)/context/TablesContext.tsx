"use client";

interface table {
  number: number;
  description?: string;
  restaurant_name: string;
  palce?: string;
  sendTo?: string;
  code?: string;
  restaurant_id: string;
  _id: string;
}

import { createContext, useContext, useReducer } from "react";
import { ArrayReducer } from "./Reducers/ArrayReducer";

const TablesContext = createContext([]);

const TablesDispatchContext = createContext(null);

export function TablesProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch]: any = useReducer(ArrayReducer, intialState);

  return (
    <TablesContext.Provider value={state}>
      <TablesDispatchContext.Provider value={dispatch}>
        {children}
      </TablesDispatchContext.Provider>
    </TablesContext.Provider>
  );
}

export function useTables() : table[]  {
  return useContext(TablesContext);
}

export function useTablesDispatch() {
  return useContext(TablesDispatchContext);
}

const intialState: table[] = [];
