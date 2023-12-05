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
    if (Object.keys(user).length == 0) {
      getApi("/user", router).then((userData) => {
        if (
          (userData && Object.keys(userData).length == 0) ||
          userData.success == false
        )
          return router.push("/signin");

        userDispatch({
          type: "added",
          payload: userData,
          id: userData._id,
        });
      });
    }

    if (Object.keys(restaurant).length == 0) {
      getApi("/restaurant", router).then((restaurant) =>
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
