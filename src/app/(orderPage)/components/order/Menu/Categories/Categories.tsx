"use client";
import React from "react";
import CategorieItem from "./CategorieItem";
import useSWR from "swr";

export default function Categories({
  categoriesItems,
}: {
  categoriesItems?: string[];
}) {
  const fetcher = (url: string) => {
    fetch(url).then((res) => res.json());
  };
  const { data, isLoading, error } = useSWR(``, fetcher);
  return (
    <>
      <p className="mb-[9px] text-base font-semibold text-[#313638]">
        Categories
      </p>
      <div className="categoriesItems mx-auto flex items-center justify-start gap-x-2 overflow-x-scroll pb-1">
        <CategorieItem name="All"></CategorieItem>
        {["test", "test1", "test2", "test4", "test5", "test6"].map((item) => (
          <CategorieItem
            name={item}
            key={item}
            imageURL="/menu/categoryImage2.jpg"
          ></CategorieItem>
        ))}
      </div>
    </>
  );
}
