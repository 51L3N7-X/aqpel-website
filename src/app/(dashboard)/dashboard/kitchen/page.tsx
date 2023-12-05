"use client";
import React, { useEffect } from "react";
import KitchenInputs from "../../components/kitchen/KitchenInputs";
import { useKitchen, useKitchenDispatch } from "../../context/KitchenContext";
import { useRouter } from "next/navigation";
import { kitchen } from "../../types";
import { useQuery } from "@tanstack/react-query";
import { getApi } from "../../services/api/getApi";
import Link from "next/link";

export default function Kitchen() {
  const kitchen = useKitchen();
  const kitchenDispatch = useKitchenDispatch();
  const router = useRouter();

  async function fetch() {
    if (Object.keys(kitchen).length == 0) {
      const data = await getApi(`/kitchen`, router);
      console.log("data" , data)
      await kitchenDispatch({
        type: "added",
        payload: data,
      });
        console.log("kitchen", kitchen);
      return data;
    }
    return kitchen;
  }

  const { data, isLoading, isError } = useQuery({
    queryKey: ["kitchen"],
    queryFn: fetch,
    // retry: false,
    // retryOnMount: false,
    // retryDelay: 0,
    // refetchOnWindowFocus: false,
    // refetchInterval: false,
    // refetchOnReconnect: true,
    // refetchIntervalInBackground: false,
    // refetchOnMount: false,
  });

  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      <p>
        <Link href="/dashboard">Back To The Dashboard</Link>
      </p>
      <h1>The Kitchen</h1>
      <br></br>
      <KitchenInputs></KitchenInputs>
    </div>
  );
}
