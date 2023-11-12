"use client";
import React from "react";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Item from "@/app/(dashboard)/components/items/Items";

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
  const [items, setItems] = useState<item[]>([]);

  const getItems = async (): Promise<any> => {
    const token: any = localStorage.getItem("token");
    const data: any = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/restaurant/${params.restaurantId}/menu/${params.menuId}/categories/${params.categoryId}/items`,
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

    console.log(data);

    setItems(data);
    return data;
  };

  const { data, isLoading, isError } = useQuery({
    queryKey: ["items"],
    queryFn: getItems,
  });

  if (isLoading) return <div>Loading...</div>;
  return (
    <Item
      ids={{
        menu: params.menuId,
        restaurant: params.restaurantId,
        category: params.categoryId,
      }}
      setItems={setItems}
      items={items}
    ></Item>
  );
}
