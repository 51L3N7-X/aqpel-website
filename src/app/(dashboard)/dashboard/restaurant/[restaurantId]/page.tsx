"use client";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Menu from "@/app/(dashboard)/components/menu/Menu";

interface menu {
  restaurant_name: string;
  name: string;
}

export default function Page({ params }: { params: { restaurantId: string } }) {
  const router = useRouter();
  const [menu, setMenu] = useState<menu>({ restaurant_name: "", name: "" });

  const getMenu = async() : Promise<any> => {
    const token: any = localStorage.getItem("token");
    const data: any = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/restaurant/${params.restaurantId}/menu`,
      {
        method: "GET",
        headers: {
          Authorization: token,
        },
      }
    ).then((res) => res.json());

    if (!data?.success && data?.message == "Unauthorized") {
      localStorage.clear();
      return router.push("/signin");
    }

    setMenu(data);
    return data;
  }

  const {data , isLoading , isError} = useQuery({
    queryKey: ["menu"] , queryFn: getMenu
  })
    
  if (isLoading) return <div>Loading...</div>;
  return (
    <Menu
      menu={menu}
      setMenu={setMenu}
      ids={{ restaurant: params.restaurantId }}
    ></Menu>
  );
}
