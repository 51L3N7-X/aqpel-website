import TopBar from "@/app/(orderPage)/components/order/Menu/TopBar/TopBar";
import React from "react";

export default function Favourites() {
  return (
    <div className="font-poppins">
      <TopBar title="Favourites"></TopBar>
      <h2 className="my-4 text-[22px] font-medium capitalize text-text">
        Favorite Dishes
      </h2>
    </div>
  );
}
