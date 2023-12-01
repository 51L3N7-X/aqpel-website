"use client";

import { createContext, useContext, useReducer } from "react";
import { ObjectAction, Reducer } from "./Reducers/ObjectReducer";
import { restaurant } from "../types";

const RestaurantContext = createContext<restaurant>({});

const RestaurantDispatchContext = createContext<(action : ObjectAction) => void>(() => {});

export function RestaurantProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [tasks, dispatch]: any[] = useReducer(Reducer, initialTasks);

  return (
    <RestaurantContext.Provider value={tasks}>
      <RestaurantDispatchContext.Provider value={dispatch}>
        {children}
      </RestaurantDispatchContext.Provider>
    </RestaurantContext.Provider>
  );
}

export function useRestaurant() {
  return useContext(RestaurantContext);
}

export function useRestaurantDispatch() {
  return useContext(RestaurantDispatchContext);
}

const initialTasks = {};
