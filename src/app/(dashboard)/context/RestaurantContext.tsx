"use client";

import { createContext, useContext, useReducer } from "react";
import { Reducer } from "./Reducers/ObjectReducer";

const RestaurantContext = createContext(null);

const RestaurantDispatchContext = createContext(null);

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
