"use client";
import React from "react";
import { useRouter } from "next/navigation";
import Item from "@/app/(dashboard)/components/items/Items";
import {
  useItems,
  useItemsDispatch,
} from "@/app/(dashboard)/context/ItemsContext";
import { getApi } from "@/app/(dashboard)/services/api/getApi";
import { useQuery } from "@tanstack/react-query";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import {item} from "@/app/(dashboard)/types"

export default function Page({
  params,
}: {
  params: { menuId: string; restaurantId: string; categoryId: string };
}) {
  const router = useRouter();
  const itemsState: { [key: string]: item[] } = useItems();
  const dispatch = useItemsDispatch();

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

  const { data, isLoading, isError, isFetched } = useQuery({
    queryKey: ["items", params.categoryId],
    queryFn: () => fetcher(`/restaurant/${params.restaurantId}/menu/${params.menuId}/categories/${params.categoryId}/items` , router, items, params),
    refetchOnMount: false,
    enabled: true,
  });

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