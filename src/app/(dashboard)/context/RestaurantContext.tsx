"use client";

import { createContext, useContext, useReducer , useEffect} from "react";
import { ObjectAction, Reducer } from "./Reducers/ObjectReducer";
import { restaurant } from "../types";
import { useRouter } from "next/navigation";

const RestaurantContext = createContext<restaurant>({});

const RestaurantDispatchContext = createContext<(action: ObjectAction) => void>(
  () => {}
);

export function RestaurantProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  useEffect(() => {
  if (!localStorage.getItem("restaurant_name")) router.push("/dashboard");
  } , [])
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
