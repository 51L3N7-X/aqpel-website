"use client";

import React from "react";
import Dashboard from "../components/dashbaord/dashboard";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useUser, useUserDispatch } from "../context/UserContext";
import { getApi } from "../services/api/getApi";
import {
  useRestaurant,
  useRestaurantDispatch,
} from "../context/RestaurantContext";

export default function Main() {
  const router = useRouter();
  const user = useUser();
  const userDispatch = useUserDispatch();
  const restaurant = useRestaurant();
  const restaurantDispatch = useRestaurantDispatch();

  useEffect(() => {
    if (Object.keys(user).length == 0) {
      getApi("/user", router).then((userData) => {
        console.log(userData);
        if (
          !userData ||
          (userData && Object.keys(userData).length == 0) ||
          (userData && userData.success == false)
        )
          return router.push("/signin");

        userDispatch({
          type: "added",
          payload: userData,
          id: userData._id,
        });

        if (Object.keys(restaurant).length == 0) {
          getApi("/restaurant", router).then((restaurant) => {
            if (!Object.keys(restaurant).length)
              return restaurantDispatch({
                type: "noData",
              });
            restaurantDispatch({
              type: "added",
              payload: restaurant,
              id: restaurant._id,
            });
          });
        }
      });
    }
  }, []);

  return <Dashboard user={user}></Dashboard>;
}
