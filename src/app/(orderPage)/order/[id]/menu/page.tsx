"use server";
import React, { useEffect } from "react";
import { Items } from "@/app/(orderPage)/components/order/Menu/Items/Items";
import Menuu from "@/app/(orderPage)/components/order/Menu/Menu/Menu";

export default async function Menu({
  params,
}: {
  params: { restaurant_id: string };
}) {
  return (
    <>
      <Menuu></Menuu>
    </>
  );
}
