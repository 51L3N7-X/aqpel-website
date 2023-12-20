"use client";
import { Items } from "@/app/(orderPage)/types";
import React from "react";
import Item from "../Item/Item";

export function Items({
  items,
  category,
}: {
  items: Items;
  category?: string;
}) {
  return (
    <>
      <p className="mb-2 mt-4 text-base font-semibold text-[#313638]">
        Popular Food
      </p>
      <div className="items relative mx-auto rounded-lg pb-20 pt-2">
        {items ? (
          items.map((item) => {
            return items.map((item: any) => (
              <Item key={`${item.id}${Math.random()}`} item={item}></Item>
            ));
          })
        ) : (
          <p>There is no items</p>
        )}
      </div>
    </>
  );
}
