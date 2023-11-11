import React from "react";
import Link from "next/link";
import { useQuery } from "react-query";
import { useEffect, useState } from "react";

export default function Restaurant({ restaurant, setRestaurant }: { restaurant: any, setRestaurant: any }) {
  const [isAdding, setIsAdding] = useState(false);
  const [addRestaurantBody, setAddRestaurantBody] = useState<{ name: string, description: string }>({ name: "", description: "" });

  const onAddRestaurant = async (e: any) => {
    e.preventDefault();
    console.log(addRestaurantBody)
    const token: any = localStorage.getItem("token");
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/restaurant`, {
      method: 'POST',
      headers: {
        "Authorization": token,
        'Content-Type': "application/json"
      },
      body: JSON.stringify(addRestaurantBody),
    })

    const data = await response.json();
    if (data?.success == false) return alert(data?.message);

    setIsAdding(false);
    setRestaurant(data);
  }

  if (isAdding) {
    return (
      <div>
        <h1>Add Restaurnt</h1>

        <form onSubmit={onAddRestaurant}>
          <label>Restaurant Name :</label>
          <br />
          <input type="text" required onChange={e => setAddRestaurantBody({ ...addRestaurantBody, name: e.target.value })} />
          <br />
          <label>Restaurant Description :</label>
          <br />
          <textarea cols={30} rows={10} onChange={e => setAddRestaurantBody({ ...addRestaurantBody, name: e.target.value })}></textarea>
          <br />
          <button type="submit">+ Add</button>
        </form>

      </div>
    )
  }
  return (
    <div className="restaurant">
      <p>
        <Link href="/dashboard">Back to the Dashboard</Link>
      </p>

      <h1>The Restaurant</h1>
      <div></div>
      {restaurant ? (<div>restaurant btn</div>) : <button onClick={() => setIsAdding(true)}>Add Restuarant</button>}
    </div>
  );
}
