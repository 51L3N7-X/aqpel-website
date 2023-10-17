"use client";
import React from "react";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import { useEffect, useState } from "react";
import NavBar from "../../components/order/NavBar/Navbar";
import Button from "../../components/order/Button/Button";
import Buttons from "../../components/order/Buttons/Buttons";
import style from "./page.module.css";
import Image from "next/image";
import Loading from "../../components/order/Loading/Loading";
import Received from "../../components/order/Received/Received";
// export const dynamicParams = false;

// export async function generateStaticParams() {
//   return [{ id: "1" }, { id: "2" }];
// }

function fetchTable(id: string) {
  console.log("test");
  //TODO: fetch table from api
  return true;
}

export default function Test({ params }: { params: { id: string } }) {
  const [isButtonPressed, setIsButtonPressed] = useState(false);
  const [isOrderReceived, setIsOrderReceived] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [callingName, setCallingName] = useState("");

  function onOrder(name: string) {
    if (name == "Menu") {
      return;
    }
    setCallingName(name);
    setIsButtonPressed(true);
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading((current) => !current);
      setIsOrderReceived((current) => !current);
    }, 3000);
  }

  function onCardClick() {
    setIsOrderReceived(false);
    setIsButtonPressed(false);
  }

  return (
    <div className={style.wrapper}>
      <div className={style.background}></div>
      <NavBar />
      <Buttons style={{ display: isButtonPressed ? "none" : "flex" }}>
        <Button
          name="Call Waiter"
          imageName="waiter"
          onClick={() => onOrder("Waiter")}
        ></Button>
        <Button
          name="Menu"
          imageName="menu"
          onClick={() => onOrder("Menu")}
        ></Button>
        <Button
          name="Bill"
          imageName="bill"
          onClick={() => onOrder("Bill")}
        ></Button>
        <Button
          name="Embers"
          imageName="embers"
          onClick={() => onOrder("Embers")}
        ></Button>
      </Buttons>
      {/* <Suspense
        fallback={
          <Loading
            name={callingName}
            style={{ display: isButtonBressed ? "block" : "none" }}
          />
        }
      >
        <Received></Received>
      </Suspense> */}

      <Loading
        name={callingName}
        style={{ display: isLoading ? "flex" : "none" }}
      />
      <Received
        name="Ahmed Nasser"
        tableNumber="7"
        imageLink="/order/images/testImage.jpg"
        style={{ display: isOrderReceived ? "flex" : "none" }}
        onClick={onCardClick}
      ></Received>

      <Image
        className={style.steam}
        src="/order/images/steam.png"
        alt="steam"
        width={757}
        height={591}
      ></Image>
    </div>
  );
}
