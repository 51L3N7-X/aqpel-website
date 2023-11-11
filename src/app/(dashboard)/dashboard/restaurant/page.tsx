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
  const token: any = localStorage.getItem("token");
  const data = useQuery("data", () => {
    return fetch(`${process.env.NEXT_PUBLIC_API_URL}/restaurant`, {
      method: "GET",
      headers: {
        Authorization: token,
      },
    }).then((res) => res.json());
  });

  useEffect(() => {
    if (!data?.data?.success && data?.data?.message == "Unauthorized") {
      localStorage.clear()
      return router.push("/signin");
    }
    
    setRestaurant(data?.data);
  } , [])


  if (data.isLoading) return <div>Loading...</div>;


  
  return <Restaurant restaurant={restaurant} setRestaurant={setRestaurant}></Restaurant>

  //   return isRestaurantExist ? (
  //     <Restaurant restaurant={data}></Restaurant>
  //   ) : (
  //     <div>Loadaing...</div>
  //   );
}
