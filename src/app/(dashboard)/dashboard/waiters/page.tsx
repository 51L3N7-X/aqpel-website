"use client";
// import React, { Fragment } from 'react'
import { useState, useEffect, Fragment } from "react";
import WaiterInputs from "../../components/waiterInputs/WaiterInputs";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Waiter, table } from "../../types";
import { useTables, useTablesDispatch } from "../../context/TablesContext";

export default function Waiters() {
  const [waiters, setWaiters] = useState<Waiter[]>([]);
  const tables = useTables();
  const tablesDisptach = useTablesDispatch();
  const router = useRouter();

  const getWaiters = async (): Promise<Waiter | void> => {
    const token: any = localStorage.getItem("token");
    if (!token) return router.push("/signin");
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/waiters`, {
      method: "GET",
      headers: {
        Authorization: token,
      },
    });
    const data = await response.json();
    console.log(data);
    if (!data?.success && data?.message == "Unauthorized") {
      localStorage.clear();
      return router.push("/signin");
    }

    setWaiters(data);
    return data;
  };

  useEffect(() => {
    if (tables && tables.length == 0) {
      const token: any = localStorage.getItem("token");
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/tables`, {
        headers: {
          Authorization: token,
        },
      }).then(async (res: any) => {
        const data = await res.json();
        console.log(data);
        tablesDisptach({
          type: "addFirstTime",
          payload: data,
        });
      });
    }
  }, []);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["waiters"],
    queryFn: getWaiters,
    // retry: false,
    // retryOnMount: false,
    // retryDelay: 0,
    // refetchOnWindowFocus: false,
    // refetchInterval: false,
    // refetchOnReconnect: true,
    // refetchIntervalInBackground: false,
    // refetchOnMount: false,
  });

  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      <p>
        <Link href="/dashboard">Back To The Dashboard</Link>
      </p>
      <WaiterContainer
        waiters={waiters}
        newWaiter={true}
        setWaiters={setWaiters}
      ></WaiterContainer>
      {waiters?.map((waiter, index) => {
        return (
          <Fragment key={index}>
            <br />
            <WaiterContainer
              id={waiter._id}
              waiters={waiters}
              newWaiter={false}
              setWaiters={setWaiters}
              waiter={waiter}
            ></WaiterContainer>
          </Fragment>
        );
      })}
    </div>
  );
}

function WaiterContainer({
  waiter,
  newWaiter,
  setWaiters,
  waiters,
  id,
}: {
  newWaiter: boolean;
  waiter?: Waiter;
  setWaiters: any;
  waiters: any;
  id?: string;
}) {
  const [isAdding, setIsAdding] = useState(false);

  return (
    <div>
      <button onClick={() => setIsAdding((val) => !val)}>
        {newWaiter ? (isAdding ? "X close" : "+ Add Waiter") : waiter?.username}
      </button>
      {isAdding && (
        <WaiterInputs
          id={id}
          waiter={waiter}
          setWaiters={setWaiters}
          newWaiter={newWaiter}
          waiters={waiters}
        ></WaiterInputs>
      )}
    </div>
  );
}
