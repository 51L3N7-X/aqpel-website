import Categories from "@/app/(orderPage)/components/order/Menu/Categories/Categories";
import { Items } from "@/app/(orderPage)/components/order/Menu/Items/Items";
import TopBanner from "@/app/(orderPage)/components/order/Menu/TopBanner/TopBanner";
import React from "react";

export default function Menu() {
  return (
    <>
      <TopBanner></TopBanner>
      <div className="relative mx-4	mt-[3px] overflow-visible">
        <div className="relative">
          <Categories></Categories>
          <Items></Items>
        </div>
      </div>
    </>
  );
}
