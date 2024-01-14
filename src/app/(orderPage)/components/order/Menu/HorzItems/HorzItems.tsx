"use client";
import React, { Suspense, useEffect, useState } from "react";
import HorzItem from "../HorzItem/HorzItem";
import {
  CartStore,
  CartItem,
} from "@/app/(orderPage)/order/[id]/menu/utils/cart";
import {
  FavStore,
  Store,
} from "@/app/(orderPage)/order/[id]/menu/utils/favourites";

export default function HorzItems({ type }: { type: "cart" | "fav" }) {
  const [cart, setCart] = useState<CartItem[]>();
  const [fav, setFav] = useState<Store[]>();

  useEffect(() => {
    const tempCart = new CartStore();
    const tempFav = new FavStore();
    setCart(tempCart.getAll());
    setFav(tempFav.getAll());
  }, []);

  return (
    <div className="mb-[35vh] flex flex-col gap-6">
      <Suspense fallback={<div>Loading...</div>}>
        {type == "cart"
          ? cart?.map((cart) => (
              <HorzItem
                name={cart.name}
                price={String(cart.price)}
                key={cart._id}
                count={cart.quanity}
                image={"/menu/item.jpg"}
              ></HorzItem>
            ))
          : fav?.map((favItem) => (
              <HorzItem
                name={favItem.name}
                price={favItem.price}
                key={favItem._id}
                image={favItem.imageUrl}
              ></HorzItem>
            ))}
      </Suspense>
    </div>
  );
}
