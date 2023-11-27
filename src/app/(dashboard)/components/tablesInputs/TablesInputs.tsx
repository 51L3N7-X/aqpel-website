import React, { useEffect, useState } from "react";
import { useTables, useTablesDispatch } from "../../context/TablesContext";
import { useRestaurant } from "../../context/RestaurantContext";
import { routeModule } from "next/dist/build/templates/app-page";
import { useRouter } from "next/navigation";

interface table {
  number: number;
  description?: string;
  restaurant_name: string | null;
  palce?: string;
  sendTo?: string;
  code?: string;
  restaurant_id: string;
  id?: string;
}

export default function TablesInputs({
  table,
  newTable: isNew,
  id,
}: {
  table?: table;
  newTable: boolean;
  id?: string;
}) {
  const [tableData, setTableData] = useState<table>({
    restaurant_name: localStorage.getItem("restaurant_name"),
    number: 0,
    restaurant_id: "",
    // id: ""
  });

  const router = useRouter()
  const tables = useTables();
  const disptach = useTablesDispatch();
  const restaurant: any = useRestaurant();

  useEffect(() => {
    //@ts-ignore
    if (Object.keys(restaurant) == 0) return router.push("/dashboard");
    if (table && Object.keys(table).length != 0) setTableData(table);
  }, [table]);

  const addOrEditTable = async (e: any) => {
    e.preventDefault();
    const token: any = localStorage.getItem("token");

    if (isNew) {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/tables`,
        {
          method: "POST",
          headers: {
            Authorization: token,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...tableData,
            // id: id,
            restaurant_id: restaurant._id,
            restaurant_name: restaurant.name,
          }),
        }
      );
      const data = await response.json();
      console.log(data);
      if (data?.success == false) {
        return alert(data.message);
      }

      //   setWaiters([...waiters, data]);
      //@ts-ignore
      disptach({
        type: "added",
        payload: data,
      });
    } else {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/tables/${id}`,
        {
          method: "PUT",
          headers: {
            Authorization: token,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...tableData,
            // id: id,
            restaurant_id: restaurant._id,
            restaurant_name: restaurant.name,
          }),
        }
      );
      const data = await response.json();
      if (data?.success == false) {
        return alert(data.message);
      }

      // setWaiters(
      //   waiters.map((waiter: any) => {
      //     if (waiter._id == id) return data;
      //     else return waiter;
      //   })
      // );
      //@ts-ignore
      disptach({
        type: "changed",
        payload: data,
        id: data._id
      })
    }


  };

  return (
    <div>
      <form onSubmit={addOrEditTable}>
        <label>Number : </label>
        <input
          type="number"
          onChange={(e) => {
            setTableData({
              ...tableData,
              number: +e.target.value
            })
          }}
          value={tableData.number}
          required
        />
        <br />
        <label>Description : </label>
        <input
          type="text"
          onChange={(e) => {
            setTableData({
              ...tableData,
              description: e.target.value
            })
          }}
          value={tableData.description}
          required
        />
        <br />
        <label>Place : </label>
        <input
          type="text"
          onChange={(e) => {
            setTableData({
              ...tableData,
              palce: e.target.value
            })
          }}
          value={tableData.palce}
          required
        />
        <br />
        <button type="submit">Save</button>
        {!isNew && <button>Delete</button>}
      </form>
    </div>
  );
}
