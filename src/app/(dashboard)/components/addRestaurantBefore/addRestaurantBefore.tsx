import React, { useState } from "react";
import {
  useRestaurant,
  useRestaurantDispatch,
} from "../../context/RestaurantContext";

export default function AddRestaurantBefore() {
  const [data, setData] = useState({});
  const restaurantDispatch = useRestaurantDispatch();

  const addRestaurant = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const token: string | any = localStorage.getItem("token");
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/restaurant`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application.json",
          Authorization: token,
        },
        body: JSON.stringify(data),
      }
    );
    const resData = await response.json();
 
    if (resData && resData?.success == false) {
      return alert(resData.message);
    }

    return restaurantDispatch({
      type: "addFirstTime",
      payload: resData,
    });
  };

  return (
    <>
      <form onSubmit={addRestaurant}></form>
    </>
  );
}
