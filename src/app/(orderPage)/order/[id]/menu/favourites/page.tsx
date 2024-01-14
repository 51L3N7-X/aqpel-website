import HorzItems from "@/app/(orderPage)/components/order/Menu/HorzItems/HorzItems";
import TopBar from "@/app/(orderPage)/components/order/Menu/TopBar/TopBar";
import React, { Suspense } from "react";
import { FavStore, Store } from "../utils/favourites";
import HorzItem from "@/app/(orderPage)/components/order/Menu/HorzItem/HorzItem";
import { useEffect, useState } from "react";

export default function Favourites() {
  // const [items, setItems] = useState<Array<Store>>([]);

  // useEffect(() => {
  //   const favStore = new FavStore();
  //   const Tempitems = favStore.getAll();
  //   setItems(Tempitems);
  // }, []);

  return (
    <div className="font-poppins">
      <TopBar title="Favourites"></TopBar>
      <h2 className="mx-6 my-4 text-[22px] font-medium capitalize text-text">
        Favorite Dishes
      </h2>
      <HorzItems type="fav"></HorzItems>
    </div>
  );
}
