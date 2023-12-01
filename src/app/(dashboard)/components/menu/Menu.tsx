import React from "react";
import Link from "next/link";
import { useEffect, useState } from "react";
import ItemButton from "../ItemButton/ItemButton";
import { menu } from "../../types";

export default function Menu({
  menu,
  disptachMenu: disptachMenu,
  ids,
}: {
  menu: any;
  disptachMenu: any;
  ids: any;
}) {
  console.log(menu);
  const [isAdding, setIsAdding] = useState(false);
  const [addMenuBody, setAddMenuBody] = useState<menu>({
    name: "",
  });

  const onAddMenu = async (e: any) => {
    e.preventDefault();
    const token: any = localStorage.getItem("token");
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/restaurant/${ids.restaurant}/menu`,
      {
        method: "POST",
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(addMenuBody),
      }
    );

    const data = await response.json();
    if (data?.success == false) return alert(data?.message);

    setIsAdding(false);
    disptachMenu({
      type: "added",
      payload: data,
      id: data._id,
    });
  };

  if (isAdding) {
    return (
      <div>
        <h1>Add Menu</h1>

        <form onSubmit={onAddMenu}>
          <label>Menu Name :</label>
          <br />
          <input
            type="text"
            required
            onChange={(e) =>
              setAddMenuBody({
                ...addMenuBody,
                name: e.target.value,
              })
            }
          />
          <br />
          <button type="submit">+ Add</button>
        </form>
      </div>
    );
  }
  return (
    <div className="">
      <p>
        <Link href="/dashboard/restaurant">Back to the Restaurant</Link>
        <br />
        <Link href="/dashboard">Back to the Dashboard</Link>
      </p>

      <h1>The Menu</h1>
      {menu && Object.keys(menu).length && menu?.data !== false ? (
        <ItemButton data={menu}></ItemButton>
      ) : (
        <button onClick={() => setIsAdding(true)}>Add Menu</button>
      )}
    </div>
  );
}
