"use client";
import React from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { getApi } from "../../services/api/getApi";
import { useTables, useTablesDispatch } from "../../context/TablesContext";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { Fragment } from "react";

interface table {
  number: number;
  description?: string;
  restaurant_name: string;
  palce?: string;
  sendTo?: string;
  code?: string;
  restaurant_id: string;
  id:string;
}

//todo: add tables like waiters, and useContext array for all tables

export default function Tables() {
  const tables: table[] = useTables();
  const disptach = useTablesDispatch();
  const router = useRouter();

  async function fetch() {
    //@ts-ignore
    if (tables.length == 0) {
      const data = await getApi(`/tables`, router);

      //@ts-ignore
      dispatch({
        type: "addFirstTime",
        payload: data,
        // id: data._id,
      });
      return data;
    }
    return tables;
  }

  const { data, isLoading, isError } = useQuery({
    queryKey: ["tables"],
    queryFn: fetch,
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
      <TableContainer newTable={true}></TableContainer>
      {tables.map((table, index) => {
        return (
          <Fragment key={index}>
            <br />
            <TableContainer
              id={table.id}
              newTable={false}
              table={table}
            ></TableContainer>
          </Fragment>
        );
      })}
    </div>
  );
}

function TableContainer({
  table,
  newTable,
  id,
}: {
  newTable: boolean;
  table?: table
  id?: string;
}) {
  const [isAdding, setIsAdding] = useState(false);

  return (
    <div>
      <button onClick={() => setIsAdding((val) => !val)}>
        {newTable ? (isAdding ? "X close" : "+ Add Waiter") : table?.number}
      </button>
      {isAdding && (
        <TableInputs
          id={id}
          table={table}
          newTable={newTable}
        ></TableInputs>
      )}
    </div>
  );
}
