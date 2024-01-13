"use client";
import React, { Dispatch, useState } from "react";
import IncreaseIcon from "../icons/increase.svg";
import DecreaseIcon from "../icons/decrease.svg";
import { ItemType } from "@/app/(orderPage)/types";
import { CartItem } from "@/app/(orderPage)/order/[id]/menu/utils/cart";

export default function IncreaseItems({
  item,
  tempCart: tempCartItem,
  setTempCart,
  number,
  setNumber,
}: {
  item: ItemType;
  tempCart: (obj: CartItem) => CartItem;
  setTempCart: Dispatch<(obj: CartItem) => CartItem>;
  number: number;
  setNumber: Dispatch<(number: any) => any>;
}) {
  const increaseNumber = () => {
    if (number == 99) return;
    setNumber((number) => {
      console.log(number);
      return number + 1;
    });
    setTempCart((obj: CartItem) => ({
      ...obj,
      quanity: number + 1,
    }));
  };

  const decreaseNumber = () => {
    if (number == 1) return;
    setNumber((number) => number - 1);
    setTempCart((obj: CartItem) => ({
      ...obj,
      quanity: number - 1,
    }));
  };

  return (
    <div className="relative h-9 w-32 rounded-2xl bg-yellow1">
      <div className="flex h-full w-full items-center justify-center">
        <p className="select-none text-lg font-semibold text-white1">
          {number}
        </p>
      </div>
      <div
        className="absolute  right-[-1%] top-0 flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-yellow1 shadow-[0px_1px_4px_0px_rgba(167,167,167,0.25)] active:select-none"
        onClick={increaseNumber}
      >
        <IncreaseIcon></IncreaseIcon>
      </div>
      <div
        className="absolute left-[-1%] top-0 flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-yellow1 shadow-[0px_1px_4px_0px_rgba(167,167,167,0.25)]"
        onClick={decreaseNumber}
      >
        <DecreaseIcon></DecreaseIcon>
      </div>
    </div>
  );
}
