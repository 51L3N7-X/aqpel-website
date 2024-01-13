"use client";
import { ItemType, ItemsType } from "@/app/(orderPage)/types";
import React, { Suspense } from "react";
import Item from "../Item/Item";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useQuery } from "@tanstack/react-query";

export function Items({ category }: { category?: string }) {
  const pathname = usePathname();

  const getItems = async () => {
    const restaurant_id = JSON.parse(
      localStorage.getItem("table")!,
    ).restaurant_id;

    localStorage.setItem("restaurant_id", restaurant_id);

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/${restaurant_id}/items`,
    );

    const data = await response.json();

    return data;
  };

  const { data, isLoading, isError } = useQuery({
    queryKey: ["items"],
    queryFn: getItems,
  });

  if (isLoading) return <div>Loading..</div>;

  return (
    <>
      <p className="mb-2 mt-4 text-base font-semibold text-[#313638]">
        Popular Food
      </p>
      <Suspense fallback={<div>loading...</div>}>
        <div className="items relative mx-auto gap-y-6 rounded-lg pb-20 pt-2">
          {data ? (
            data.map((item: ItemType) => {
              return (
                <Link
                  href={`${pathname}/${item._id}`}
                  key={`${item._id}${Math.random()}`}
                >
                  <Item item={item}></Item>
                </Link>
              );
            })
          ) : (
            <p>There is no items</p>
          )}
        </div>
      </Suspense>
    </>
  );
}
