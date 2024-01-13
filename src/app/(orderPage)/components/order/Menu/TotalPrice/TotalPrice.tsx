"use client";
import { CartStore } from "@/app/(orderPage)/order/[id]/menu/utils/cart";
import React, { useEffect, useState } from "react";

export default function TotalPrice() {
  const [price, setTotalPrice] = useState(0);

  useEffect(() => {
    const cart = new CartStore();
    setTotalPrice(cart.getTotalPrice());
  }, []);
  return (
    <div className="fixed bottom-[25vh] right-1/2 flex min-w-[90%] translate-x-1/2 items-center justify-between">
      <p className="text-[22px] font-medium text-text">Total Price:</p>
      <h1 className="text-[22px] font-semibold text-yellow1">{price}</h1>
    </div>
  );
}
