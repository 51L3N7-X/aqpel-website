"use client";
// import "./globals.css";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { Items } from "../Items/Items";
import TopBanner from "../TopBanner/TopBanner";
import Categories from "../Categories/Categories";
import Fotter from "../NavBar/NavBar";

export default function Menu() {
  const sendOrder = async () => {};

  const getItems = async () => {
    const items: any = [];
    const restaurant_id = JSON.parse(
      localStorage.getItem("table")!,
    ).restaurant_id;

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/${restaurant_id}/menu`,
    );

    const data: data = await response.json();

    for (let category of data.restaurant.menu.categories) {
      for (let item of category.items) {
        items.push(item);
      }
    }
    localStorage.setItem("restaurant_id", data.restaurant._id);
    localStorage.setItem("items", JSON.stringify(items));
    return items;
  };

  const { data, isLoading, isError } = useQuery({
    queryKey: ["items"],
    queryFn: getItems,
  });

  console.log(data);
  if (isLoading) return <div>Loading..</div>;

  return (
    <>
      <TopBanner></TopBanner>
      <div className="relative mx-4	mt-[3px] overflow-visible">
        <div className="relative">
          <Categories></Categories>
          <Items items={data}></Items>
          <Fotter></Fotter>
        </div>
      </div>
    </>
  );
}

interface data {
  restaurant: {
    _id: string;
    menu: {
      categories: Array<{ items: [] }>;
    };
  };
}
