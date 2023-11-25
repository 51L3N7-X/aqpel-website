"use client";

import React from "react";
import Dashboard from "../components/dashbaord/dashboard";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useUser, useUserDispatch } from "../context/UserContext";
import { getApi } from "../services/api/getApi";

export default function Main() {
  const router = useRouter();
  const [isAccessAble, setIsAccessAble] = useState<boolean>(false);
  const user = useUser();
  const dispatch = useUserDispatch();

  console.log(user);

  useEffect(() => {
    //@ts-ignore
    if (Object.keys(user) == 0) {
      getApi("/user", router).then((user) =>
        //@ts-ignore
        dispatch({
          type: "added",
          payload: user,
          id: user._id,
        })
      );
    }
  });

  return <Dashboard user={user}></Dashboard>;
}
