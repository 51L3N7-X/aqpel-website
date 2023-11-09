"use client";

import React from "react";
import Dashboard from "../components/dashbaord/dashboard";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function Main() {
  const router = useRouter();
  const [isAccessAble, setIsAccessAble] = useState<boolean>(false);
  const [data, setData] = useState<any>({});

  useEffect(() => {
    checkUser(localStorage.getItem("token"));
  }, []);
  const checkUser = async (token: string | null) => {
    if (!token) return router.push("/signin");

    let user: any = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/`, {
      method: "GET",
      headers: {
        Authorization: token,
      },
    });

    user = await user.json();
    if (user.success == false) return router.push("/singin");
   setIsAccessAble(true);
   setData(user)
  };

  return isAccessAble ? <Dashboard user={data}></Dashboard> : <div>Loading ...</div>;
}
