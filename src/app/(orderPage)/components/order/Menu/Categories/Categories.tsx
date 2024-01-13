"use client";
import React from "react";
import CategorieItem from "./CategorieItem";
import useSWR from "swr";
import { categorie } from "@/app/(dashboard)/types";

export default function Categories({
  categoriesItems,
}: {
  categoriesItems?: string[];
}) {
  const getCategories = async () => {
    const restaurant_id = JSON.parse(
      localStorage.getItem("table")!,
    ).restaurant_id;

    localStorage.setItem("restaurant_id", restaurant_id);

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/${restaurant_id}/categories`,
    );

    const data = await response.json();

    return data;
  };

  const { data, isLoading, error } = useSWR(`${process.env.NEXT_PUBLIC_API_URL}/`, getCategories);

  if (isLoading) return <div>Loading..</div>;
  return (
    <>
      <p className="mb-[9px] text-base font-semibold text-[#313638]">
        Categories
      </p>
      <div className="categoriesItems mx-auto flex items-center justify-start gap-x-2 overflow-x-scroll pb-1">
        <CategorieItem name="All"></CategorieItem>
        {data.map((category: categorie) => (
          <CategorieItem
            name={category.name}
            key={category._id}
            imageURL={category.imageUrl}
          ></CategorieItem>
        ))}
      </div>
    </>
  );
}
