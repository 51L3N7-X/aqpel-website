import React, { useState } from "react";
import { kitchen } from "../../types";
import { useKitchen, useKitchenDispatch } from "../../context/KitchenContext";

//todo: if there is no restaurant return to the main page
export default function KitchenInputs() {
  const Kitchen: any = useKitchen();
  console.log(Kitchen);
  const kitchenDispatch = useKitchenDispatch();
  const [kitchenData, setKitchenData] = useState<kitchen>({
    restaurant_name: "",
    username: "",
    password: "",
  });

  const EditRestaurant = async (e: any) => {
    e.preventDefault();
    const token: any = localStorage.getItem("token");
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/kitchen`, {
      method: "POST",
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...kitchenData,
        restaurant_name: localStorage.getItem("restaurant_name"),
      }),
    });
    const data = await response.json();
    if (data && data.success == false) {
      return alert(data.messageF);
    }
    return kitchenDispatch({
      type: "added",
      payload: data,
    });
  };

  return (
    <form onSubmit={EditRestaurant}>
      <label>Username</label>
      <input
        type="text"
        value={Kitchen?.username || kitchenData.username}
        onChange={(e) =>
          setKitchenData({
            ...kitchenData,
            username: e.target.value,
          })
        }
      />
      <br />
      <label>Passowrd</label>
      <input
        type="text"
        value={Kitchen?.password || kitchenData.password}
        onChange={(e) =>
          setKitchenData({
            ...kitchenData,
            password: e.target.value,
          })
        }
      />
      <button type="submit">Save</button>
    </form>
  );
}
