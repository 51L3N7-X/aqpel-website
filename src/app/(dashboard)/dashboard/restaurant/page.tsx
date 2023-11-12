"use client";

import React from "react";
import Restaurant from "../../components/restaurant/restaurant";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";

export default function Page() {
  const router = useRouter();
  const [restaurant, setRestaurant] = useState<any>({});

  const getRestaurant = async (): Promise<any> => {
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
    setRestaurant(data);
    return data;
  };

  const { data, isLoading, isError } = useQuery({
    queryKey: ["restaurant"],
    queryFn: getRestaurant,
    // retry: true,
  });

  if (isLoading) return <div>Loading...</div>;

  return (
    <Restaurant
      restaurant={restaurant}
      setRestaurant={setRestaurant}
    ></Restaurant>
  );
}
