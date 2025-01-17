import React, { useEffect, useState } from "react";
import { useTablesDispatch } from "../../context/TablesContext";
import { useRestaurant } from "../../context/RestaurantContext";
import { table } from "../../types";

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

  const disptach = useTablesDispatch();
  const restaurant: any = useRestaurant();

  useEffect(() => {
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
        id: data._id,
      });
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
              number: +e.target.value,
            });
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
              description: e.target.value,
            });
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
              place: e.target.value,
            });
          }}
          value={tableData.place}
          required
        />
        <br />
        <button type="submit">Save</button>
        {!isNew && <button>Delete</button>}
      </form>
    </div>
  );
}
