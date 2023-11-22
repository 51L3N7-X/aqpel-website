"use client";

import React from "react";
import Restaurant from "../../components/restaurant/restaurant";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
// import { useQuery } from "@tanstack/react-query";
import { useRestaurant, useRestaurantDispatch } from "../RestaurantContext";

export default function Page() {
  const restaurant = useRestaurant();
  const dispatch = useRestaurantDispatch();
  const router = useRouter();
  // const [restaurant, setRestaurant] = useState<any>({});

  const fetchRestaurant = async (): Promise<any> => {
    const token: any = localStorage.getItem("token");
    let data: any = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/restaurant`,
      {
        method: "GET",
        headers: {
          Authorization: token,
        },
      }
    ).then((res) => res.json());

    if (!data?.success && data?.message == "Unauthorized") {
      localStorage.clear();
      return router.push("/signin");
    }

    localStorage.setItem("restaurant_name", data?.name);
    // setRestaurant(data);
    return data;
  };

  useEffect(() => {
    //@ts-ignore
    if (Object.keys(restaurant) == 0) {
      //@ts-ignore
      fetchRestaurant().then(data => dispatch({
        type: "added",
        payload: data,
        id: data._id,
      }))
    }
  }, [])
  // const { data, isLoading, isError } = useQuery({
  //   queryKey: ["restaurant"],
  //   queryFn: fetchRestaurant,
  //   // retry: true,
  // });

  // if (isLoading) return <div>Loading...</div>;

  return (
    <Restaurant
      restaurant={restaurant}
    ></Restaurant>
  );
}
