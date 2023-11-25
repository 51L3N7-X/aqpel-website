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

interface menu {
  restaurant_name: string;
  name: string;
}

export default function Page({ params }: { params: { restaurantId: string } }) {
  const router = useRouter();
  const menu = useMenu();
  const dispatch = useMenuDispatch();
  // const getMenu = async (): Promise<any> => {
  //   const token: any = localStorage.getItem("token");
  //   const data: any = await fetch(
  //     `${process.env.NEXT_PUBLIC_API_URL}/restaurant/${params.restaurantId}/menu`,
  //     {
  //       method: "GET",
  //       headers: {
  //         Authorization: token,
  //       },
  //     }
  //   ).then((res) => res.json());

  //   if (!data?.success && data?.message == "Unauthorized") {
  //     localStorage.clear();
  //     return router.push("/signin");
  //   }

  //   // setMenu(data);
  //   return data;
  // };

  // const { data, isLoading, isError } = useQuery({
  //   queryKey: ["menu"],
  //   queryFn: getMenu,
  // });

  useEffect(() => {
    //@ts-ignore
    if (Object.keys(menu) == 0) {
      getApi(`/restaurant/${params.restaurantId}/menu` , router).then((data) =>
        //@ts-ignore
        dispatch({
          type: "added",
          payload: data,
          id: data._id,
        })
      );
    }
  } , []);

  // if (isLoading) return <div>Loading...</div>;
  return (
    <Menu
      menu={menu}
      disPatchMenu={dispatch}
      ids={{ restaurant: params.restaurantId }}
    ></Menu>
  );
}
