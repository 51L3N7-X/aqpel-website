import React, { useEffect, useState } from "react";
import { Waiter } from "../../types";
import { useTables } from "../../context/TablesContext";

export default function WaiterInputs({
  waiter,
  newWaiter: isNew,
  setWaiters,
  waiters,
  id,
}: {
  waiter?: Waiter;
  newWaiter: boolean;
  setWaiters: any;
  waiters: any;
  id?: string;
}) {
  const [waiterData, setWaiterData] = useState<Waiter>({
    restaurant_name: localStorage.getItem("restaurant_name"),
    username: "",
    password: "",
    tables: [],
  });
  const tables = useTables();
  useEffect(() => {
    if (waiter && Object.keys(waiter).length != 0) setWaiterData(waiter);
  }, [waiter]);

  const addOrRemoveTable = async (id: string) => {
    waiterData.tables?.includes(id)
      ? setWaiterData({
          ...waiterData,
          tables: waiterData.tables?.filter((itemId) => itemId != id),
        })
      : setWaiterData({
          ...waiterData,
          tables: [...waiterData.tables, id],
        });
    const stateTables = waiterData.tables;
    if (stateTables?.includes(id)) {
      setWaiterData({
        ...waiterData,
        tables: waiterData.tables?.filter((itemId) => itemId != id),
      });
    }
  };

  const addOrEditWaiter = async (e: any) => {
    e.preventDefault();
    const token: any = localStorage.getItem("token");

    if (isNew) {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/waiters`,
        {
          method: "POST",
          headers: {
            Authorization: token,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(waiterData),
        }
      );
      const data = await response.json();
      if (data?.success == false) {
        return alert(data.message);
      }

      setWaiters([...waiters, data]);
    } else {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/waiters/${id}`,
        {
          method: "PUT",
          headers: {
            Authorization: token,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(waiterData),
        }
      );
      const data = await response.json();
      if (data?.success == false) {
        return alert(data.message);
      }

      setWaiters(
        waiters.map((waiter: any) => {
          if (waiter._id == id) return data;
          else return waiter;
        })
      );
    }
  };

  return (
    <div>
      <form onSubmit={addOrEditWaiter}>
        <label>Username : </label>
        <input
          type="text"
          onChange={(e) => {
            setWaiterData({
              ...waiterData,
              username: e.target.value,
            });
          }}
          value={waiterData.username}
          required
        />
        <br />
        <label>Password : </label>
        <input
          type="text"
          onChange={(e) => {
            setWaiterData({
              ...waiterData,
              password: e.target.value,
            });
          }}
          value={waiterData.password}
          required
        />
        <br />
        <label>Name : </label>
        <input
          type="text"
          onChange={(e) => {
            setWaiterData({
              ...waiterData,
              name: e.target.value,
            });
          }}
          value={waiterData.name}
        />
        <br />
        <label>Is The Waiter Active?</label>
        <input
          type="checkBox"
          onChange={(e) => {
            setWaiterData({
              ...waiterData,
              active: e.target.checked,
            });
          }}
          checked={waiterData.active}
        />
        <br />
        <label>PhotoURL : </label>
        <input
          type="text"
          onChange={(e) => {
            setWaiterData({
              ...waiterData,
              photoUrl: e.target.value,
            });
          }}
          value={waiterData.photoUrl}
        />
        <br />
        <h2>Tables:</h2>
        {tables.map((table) => (
          <>
            <label>{table.number}</label>
            <input
              key={table._id}
              type="checkbox"
              checked={waiterData.tables?.includes(table._id)}
              onChange={() => addOrRemoveTable(table._id)}
              id={table._id}
            ></input>{" "}
          </>
        ))}
        <button type="submit">Save</button>
        {!isNew && <button>Delete</button>}
      </form>
    </div>
  );
}
