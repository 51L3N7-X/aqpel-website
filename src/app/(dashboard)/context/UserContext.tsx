"use client";

import { createContext, useContext, useReducer } from "react";
import { Reducer } from "./Reducers/ObjectReducer";

const UserContext = createContext({});

const UserDispatchContext = createContext({});

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch]: any[] = useReducer(Reducer, initialState);

  return (
    <UserContext.Provider value={state}>
      <UserDispatchContext.Provider value={dispatch}>
        {children}
      </UserDispatchContext.Provider>
    </UserContext.Provider>
  );
}

export function useUser() {
  return useContext(UserContext);
}

export function useUserDispatch() {
  return useContext(UserDispatchContext);
}

const initialState = {};
