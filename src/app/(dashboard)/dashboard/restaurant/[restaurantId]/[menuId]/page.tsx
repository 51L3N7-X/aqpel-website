"use client";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import Categories from "@/app/(dashboard)/components/categories/categories";
import { getApi } from "@/app/(dashboard)/services/api/getApi";
import {
  useCategorie,
  useCategorieDispatch,
} from "@/app/(dashboard)/context/CategoriesContext";


export default function Page({
  params,
}: {
  params: { menuId: string; restaurantId: string };
}) {
  const router = useRouter();
  const categories = useCategorie();
  const dispatch = useCategorieDispatch();

  async function fetch() {
    //@ts-ignore
    if (categories.length == 0) {
      const data = await getApi(
        `/restaurant/${params.restaurantId}/menu/${params.menuId}/categories`,
        router
      );

      //@ts-ignore
      dispatch({
        type: "addFirstTime",
        payload: data,
        // id: data._id,
      });
      return data;
    }
    return categories;
  }

  const { data, isLoading, isError } = useQuery({
    queryKey: ["categories"],
    queryFn: fetch,
  });

  if (isLoading) return <div>Loading...</div>;
  return (
    <Categories
      categories={categories}
      dispatchCategories={dispatch}
      ids={{ menu: params.menuId, restaurant: params.restaurantId }}
    ></Categories>
  );
}
