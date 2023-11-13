"use client";
import React from "react";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Categories from "@/app/(dashboard)/components/categories/categories";

interface categorie {
  name: string;
  imageUrl: string;
  description: string;
}

export default function Page({
  params,
}: {
  params: { menuId: string; restaurantId: string };
}) {
  const router = useRouter();
  const [categories, setCategories] = useState<categorie[]>([]);

  const getCategories = async (): Promise<any> => {
    const token: any = localStorage.getItem("token");
    const data: any = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/restaurant/${params.restaurantId}/menu/${params.menuId}/categories`,
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

    setCategories(data);
    return data;
  };

  const { data, isLoading, isError } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });

  if (isLoading) return <div>Loading...</div>;
  return (
    <Categories
      categories={categories}
      setCategories={setCategories}
      ids={{ menu: params.menuId, restaurant: params.restaurantId }}
    ></Categories>
  );
}
