"use client";
import React, { Suspense, useEffect, useState } from "react";
import HorzItem from "../HorzItem/HorzItem";
import {
  CartStore,
  CartItem,
} from "@/app/(orderPage)/order/[id]/menu/utils/cart";

export default function HorzItems() {
  const [cart, setCart] = useState<CartItem[]>();

  useEffect(() => {
    const tempCart = new CartStore();
    setCart(tempCart.getAll());
  }, []);

  return (
    <div className="mb-[35vh] flex flex-col gap-6">
      <Suspense fallback={<div>Loading...</div>}>
        {cart?.map((cart) => (
          <HorzItem
            name={cart.name}
            price={String(cart.price)}
            key={cart._id}
            count={cart.quanity}
            image={"/menu/item.jpg"}
          ></HorzItem>
        ))}
      </Suspense>
    </div>
  );
}
