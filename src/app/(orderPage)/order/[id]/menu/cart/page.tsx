import React, { useEffect, useState } from "react";
import TopBar from "@/app/(orderPage)/components/order/Menu/TopBar/TopBar";
import HorzItems from "@/app/(orderPage)/components/order/Menu/HorzItems/HorzItems";
import { CartItem, CartStore } from "../utils/cart";
import HorzItem from "@/app/(orderPage)/components/order/Menu/HorzItem/HorzItem";
import BottomButton from "@/app/(orderPage)/components/order/Menu/BottomButton/BottomButton";
import TotalPrice from "@/app/(orderPage)/components/order/Menu/TotalPrice/TotalPrice";

export default function Cart() {
  return (
    <div className="">
      <TopBar title="Cart"></TopBar>
      <HorzItems></HorzItems>
      <TotalPrice></TotalPrice>
      <BottomButton title="Send The Order"></BottomButton>
    </div>
  );
}
