"use client";

import React from "react";
import Dashboard from "../components/dashbaord/dashboard";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useUser, useUserDispatch } from "../context/UserContext";
import { getApi } from "../services/api/getApi";
import {
  useRestaurant,
  useRestaurantDispatch,
} from "../context/RestaurantContext";

export default function Main() {
  const router = useRouter();
  // const [isAccessAble, setIsAccessAble] = useState<boolean>(false);
  const user = useUser();
  const userDispatch = useUserDispatch();
  const restaurant = useRestaurant();
  const restaurantDispatch = useRestaurantDispatch();

  console.log(user);

  useEffect(() => {
    //@ts-ignore
    if (Object.keys(user) == 0) {
      getApi("/user", router).then((userData) => {
        if (
          (userData && Object.keys(userData).length == 0) ||
          userData.success == false
        )
          return router.push("/signin");
        //@ts-ignore
        userDispatch({
          type: "added",
          payload: userData,
          id: userData._id,
        });
      });
    }

    //@ts-ignore
    if (Object.keys(restaurant) == 0) {
      getApi("/restaurant", router).then((restaurant) =>
        //@ts-ignore
        restaurantDispatch({
          type: "added",
          payload: restaurant,
          id: restaurant._id,
        })
      );
    }
  }, []);

  return <Dashboard user={user}></Dashboard>;
}
