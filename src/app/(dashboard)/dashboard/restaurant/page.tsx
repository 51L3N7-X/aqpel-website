"use client";

import React from "react";
import Restaurant from "../../components/restaurant/restaurant";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getApi } from "../../services/api/getApi";
import {
  useRestaurant,
  useRestaurantDispatch,
} from "../../context/RestaurantContext";

export default function Page() {
  const restaurant = useRestaurant();
  const dispatch = useRestaurantDispatch();
  const router = useRouter();

  useEffect(() => {
    if (Object.keys(restaurant).length == 0) {
      getApi("/restaurant", router).then((data) => {
        console.log(data);
        if (data && Object.keys(data).length == 0)
          return dispatch({ type: "noData" });
        dispatch({
          type: "added",
          payload: data,
          id: data._id,
        });
      });
    }
  }, []);

  // const { data, isLoading, isError } = useQuery({
  //   queryKey: ["restaurant"],
  //   queryFn: fetchRestaurant,
  //   // retry: true,
  // });

  // if (isLoading) return <div>Loading...</div>;

  return <Restaurant restaurant={restaurant}></Restaurant>;
}
