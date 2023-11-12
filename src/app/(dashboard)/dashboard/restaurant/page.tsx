"use client";

import React from "react";
import Restaurant from "../../components/restaurant/restaurant";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import useSWR, { Fetcher } from "swr";
import { useQuery } from "react-query";

const fetcher = (url: string, token: string): any =>
  fetch(url, { headers: { Authorization: token } }).then((res) => res.json());

export default function Page() {

  const router = useRouter();
  // const [isRestaurantExist, setIsRestaurantExist] = useState<Boolean>(true);
  const [restaurant, setRestaurant] = useState<any>({});
  // const [token, setToken] = useState<any>("");

  //     const checkRestaurant = async (token: string | null) => {

  //       if (!token) return router.push("/signin");

  //       const _ = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/restaurant`, {
  //         method: "GET",
  //         headers: {
  //           Authorization: token,
  //         },
  //       });

  //       const restaurant: any = _.json();
  //       if (!restaurant.success && restaurant.message == "Unauthorized") {
  //         localStorage.clear();
  //         return router.push("/signin");
  //       }
  //       setIsRestaurantExist(true);
  //       setData(restaurant);
  //     };

  //     useEffect(() => {
  //       checkRestaurant(localStorage.getItem("token"));
  //     }, []);

  //   const token:any = localStorage.getItem("token");

  //   const { data, error, isLoading } = useSWR<any , any , any , any>(
  //     [process.env.NEXT_PUBLIC_API_URL + "/restaurant" , token],
  //     ([url, token] : any[any]) => fetcher(url , token)
  //   );
  //   console.log(data);

  const response = useQuery("data", async () => {
    const token: any = localStorage.getItem("token")
    const data: any = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/restaurant`, {
      method: "GET",
      headers: {
        Authorization: token,
      },
    }).then((res) => res.json());

    if (!data?.success && data?.message == "Unauthorized") {
      localStorage.clear()
      return router.push("/signin");
    }

    console.log("data is " , data);
    localStorage.setItem("restaurant_name", data.name)
    setRestaurant(data);
    return data;
  });

  // setRestaurant(response.data)
  //   useEffect(() => {
  //     // setToken(localStorage.getItem("token"))
  //   if (!data?.data?.success && data?.data?.message == "Unauthorized") {
  //     localStorage.clear()
  //     return router.push("/signin");
  //   }

  //   setRestaurant(data?.data);
  // }, [])


  if (response.isLoading) return <div>Loading...</div>;

  console.log(restaurant);

  return <Restaurant restaurant={restaurant || response.data} setRestaurant={setRestaurant}></Restaurant>

  //   return isRestaurantExist ? (
  //     <Restaurant restaurant={data}></Restaurant>
  //   ) : (
  //     <div>Loadaing...</div>
  //   );
}
