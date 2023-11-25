import React from "react";
import Link from "next/link";
import { useEffect, useState } from "react";
import ItemButton from "../ItemButton/ItemButton";
import { useRestaurantDispatch } from "../../context/RestaurantContext";

export default function Restaurant({ restaurant }: { restaurant: any }) {
  const dispatch = useRestaurantDispatch();
  const [isAdding, setIsAdding] = useState(false);
  const [addRestaurantBody, setAddRestaurantBody] = useState<{
    name: string;
    description: string;
  }>({ name: "", description: "" });

  const onAddRestaurant = async (e: any) => {
    e.preventDefault();
    const token: any = localStorage.getItem("token");
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/restaurant`,
      {
        method: "POST",
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(addRestaurantBody),
      }
    );

    const data = await response.json();
    console.log(data);
    if (data?.success == false) return alert(data?.message);
    //@ts-ignore
    dispatch({ type: "added", payload: data });
    setIsAdding(false);
  };

  if (isAdding) {
    return (
      <div>
        <h1>Add Restaurnt</h1>

        <form onSubmit={onAddRestaurant}>
          <label>Restaurant Name :</label>
          <br />
          <input
            type="text"
            required
            onChange={(e) =>
              setAddRestaurantBody({
                ...addRestaurantBody,
                name: e.target.value,
              })
            }
          />
          <br />
          <label>Restaurant Description :</label>
          <br />
          <textarea
            cols={30}
            rows={10}
            onChange={(e) =>
              setAddRestaurantBody({
                ...addRestaurantBody,
                description: e.target.value,
              })
            }
          ></textarea>
          <br />
          <button type="submit">+ Add</button>
        </form>
      </div>
    );
  }
  return (
    <div className="restaurant">
      <p>
        <Link href="/dashboard">Back to the Dashboard</Link>
      </p>

      <h1>The Restaurant</h1>
      {restaurant && Object.keys(restaurant).length ? (
        <ItemButton data={restaurant}></ItemButton>
      ) : (
        <button onClick={() => setIsAdding(true)}>Add Restuarant</button>
      )}
    </div>
  );
}
