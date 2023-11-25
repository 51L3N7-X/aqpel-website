"use client";
import React from "react";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Item from "@/app/(dashboard)/components/items/Items";
import {
  useItems,
  useItemsDispatch,
} from "@/app/(dashboard)/context/ItemsContext";
import { getApi } from "@/app/(dashboard)/services/api/getApi";
import useSWR from "swr";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

interface item {
  name: string;
  price: string;
  description: string;
  calories: string;
  people: string;
  new: boolean;
  special: boolean;
  imageUrl: string;
}

export default function Page({
  params,
}: {
  params: { menuId: string; restaurantId: string; categoryId: string };
}) {
  const router = useRouter();
  const itemsState: { [key: string]: item[] } = useItems();
  const dispatch = useItemsDispatch();
  // alert("hello");

  const items = itemsState[String(params.categoryId)];
  console.log(items, params.categoryId, itemsState);

  async function fetcher(url: string, router: AppRouterInstance, items: item[], params: any) {

    //@ts-ignore
    if (!items || Object.keys(items).length == 0) {
      const data = await getApi(
        url,
        router
      );



      //@ts-ignore
      dispatch({
        type: "addFirstTime",
        payload: data,
        categorieId: params.categoryId,
        // id: data._id,
      });
      return data;
    }
    return items;
  }



  // const { data, isLoading, isError, isFetched } = useQuery({
  //   queryKey: ["items", params.categoryId],
  //   queryFn: fetch,
  //   refetchOnMount: false,
  //   enabled: true,
  // });
  // alert(`is fetched ${isFetched}`);

  const { data, error, isLoading } = useSWR(
    `/restaurant/${params.restaurantId}/menu/${params.menuId}/categories/${params.categoryId}/items`, (url) => fetcher(url, router, items, params), {
    // revalidateIfStale: true,
    // revalidateOnMount: true,
    // keepPreviousData: false,
    revalidateOnFocus: false,

  }
  );
  // useQuery({
  //   queryKey: ["items", params.categoryId],
  //   queryFn: fetch,
  //   enabled: true,
  //   refetchOnMount: true,
  // });

  // useEffect(() => {
  //   if (pathname !== router.route) {
  //     // Navigated to a different page
  //     refetch(); // Force a refetch of the data
  //   }
  // }, [pathname, router.route, refetch]);

  if (isLoading) return <div>Loading...</div>;

  return (
    <Item
      ids={{
        menu: params.menuId,
        restaurant: params.restaurantId,
        category: params.categoryId,
      }}
      dispatchItems={dispatch}
      items={itemsState[params.categoryId]}
    ></Item>
  );
}
