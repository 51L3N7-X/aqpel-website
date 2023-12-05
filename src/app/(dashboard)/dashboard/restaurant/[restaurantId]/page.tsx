"use client";
import React, { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Menu from "@/app/(dashboard)/components/menu/Menu";
import {
  useMenu,
  useMenuDispatch,
} from "@/app/(dashboard)/context/MenuContext";
import { getApi } from "@/app/(dashboard)/services/api/getApi";

export default function Page({ params }: { params: { restaurantId: string } }) {
  const router = useRouter();
  const menu = useMenu();
  const dispatch = useMenuDispatch();

  useEffect(() => {
    if (Object.keys(menu).length == 0) {
      getApi(`/restaurant/${params.restaurantId}/menu`, router).then((data) => {
        if (data && Object.keys(data).length == 0) {
          return dispatch({
            type: "noData",
          });
        }
        return dispatch({
          type: "added",
          payload: data,
          id: data._id,
        });
      });
    }
  }, []);

  // if (isLoading) return <div>Loading...</div>;
  return (
    <Menu
      menu={menu}
      disptachMenu={dispatch}
      ids={{ restaurant: params.restaurantId }}
    ></Menu>
  );
}
