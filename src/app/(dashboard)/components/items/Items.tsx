"use client"
import React from "react";
import { useState } from "react";
import Link from "next/link";
import ItemButton from "../ItemButton/ItemButton";
import { item } from "../../types";

export default function Item({
  items,
  dispatchItems,
  ids,
}: {
  items: any;
  dispatchItems: any;
  ids: { restaurant: string; menu: string; category: string };
}) {
  const [isAdding, setIsAdding] = useState(false);
  const [addItemBody, setAddItemBody] = useState<item>({
    name: "",
    price: "",
    description: "",
    calories: "",
    people: "",
    new: false,
    special: false,
    imageUrl: "",
  });

  const onAddItem = async (e: any) => {
    e.preventDefault();
    const token: any = localStorage.getItem("token");
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/restaurant/${ids.restaurant}/menu/${ids.menu}/categories/${ids.category}/items`,
      {
        method: "POST",
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(addItemBody),
      }
    );

    const data = await response.json();
    if (data?.success == false) return alert(data?.message);

    setIsAdding(false);
    dispatchItems({
      type: "added",
      payload: data,
      id: data._id,
      categorieId: ids.category,
    });
  };

  if (isAdding) {
    return (
      <div>
        <h1>Add Item</h1>

        <form onSubmit={onAddItem}>
          <label>Item Name :</label>
          <br />
          <input
            type="text"
            required
            onChange={(e) =>
              setAddItemBody({
                ...addItemBody,
                name: e.target.value,
              })
            }
          />
          <br />
          <label>Item Price :</label>
          <br />
          <input
            type="text"
            required
            onChange={(e) =>
              setAddItemBody({
                ...addItemBody,
                price: e.target.value,
              })
            }
          />
          <br />
          <label>Item Description :</label>
          <br />
          <input
            type="text"
            onChange={(e) =>
              setAddItemBody({
                ...addItemBody,
                description: e.target.value,
              })
            }
          ></input>
          <br />
          <label>Item Calories :</label>
          <br />
          <input
            type="number"
            onChange={(e) =>
              setAddItemBody({
                ...addItemBody,
                calories: e.target.value,
              })
            }
          />
          <br />
          <label>Item People :</label>
          <br />
          <input
            type="number"
            onChange={(e) =>
              setAddItemBody({
                ...addItemBody,
                people: e.target.value,
              })
            }
          />
          <br />
          <label>Item Is New ?</label>

          <input
            type="checkbox"
            onChange={(e) =>
              setAddItemBody({
                ...addItemBody,
                new: e.target.checked,
              })
            }
          />
          <br />
          <label>Item Is Spceial ?</label>

          <input
            type="checkbox"
            onChange={(e) =>
              setAddItemBody({
                ...addItemBody,
                special: e.target.checked,
              })
            }
          />
          <br />
          <label>Item Image URL</label>
          <input
            type="text"
            onChange={(e) =>
              setAddItemBody({
                ...addItemBody,
                imageUrl: e.target.value,
              })
            }
          ></input>
          <br />
          <button type="submit">+ Add</button>
        </form>
      </div>
    );
  }
  return (
    <div className="">
      <p>
        <Link href={"/dashboard/restaurant/" + ids.restaurant + "/" + ids.menu}>
          Back to the Categories
        </Link>
        <br />
        <Link href="/dashboard">Back to the Dashboard</Link>
      </p>

      <h1>The Items</h1>
      {
        //@ts-ignore
        items?.map((item, index) => {
          return <ItemButton data={item} key={index}></ItemButton>;
        })
      }
      <button onClick={() => setIsAdding(true)}>Add Item</button>
    </div>
  );
}
