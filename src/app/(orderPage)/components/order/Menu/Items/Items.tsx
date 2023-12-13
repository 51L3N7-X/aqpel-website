"use client";
import { Items } from "@/app/(orderPage)/types";
import React from "react";
import Item from "../Item/Item";

export function Items({ items }: { items: Items }) {
  return (
    <div className="relative flex px-11 py-11 max-w-[500px] flex-wrap gap-y-7 gap-x-4">
      {items ? (
        items.map((item) => {
          return <Item key={item.id} item={item}></Item>;
        })
      ) : (
        <p>There is no items</p>
      )}
    </div>
  );
}
