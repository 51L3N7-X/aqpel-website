"use client";
import "./test.css";
import React from "react";
import { useEffect, useState } from "react";
import { socket, waiter } from "./socket";
import NavBar from "../NavBar/Navbar";
import Button from "../Button/Button";
import Buttons from "../Buttons/Buttons";
import style from "./order.module.css";
import Image from "next/image";
import Loading from "../Loading/Loading";
import Received from "../Received/Received";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";

export default function Order({
  params,
  table,
}: {
  params: { id: string };
  table: any;
}) {
  const pathname = usePathname();
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [isButtonPressed, setIsButtonPressed] = useState(false);
  const [isOrderReceived, setIsOrderReceived] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [callingName, setCallingName] = useState("");
  const [receivedData, setReceivedData] = useState<any>({});
  const router = useRouter();

  useEffect(() => {
    socket.connect();
    // waiter.connect();

    socket.emit("subscribe", String(params.id));
    // waiter.emit("subscribe", [String(params.id)]);

    function onDone({ name, photoUrl }: { name: string; photoUrl: string }) {
      setIsLoading((current) => false);
      setIsOrderReceived((current) => true);
      setReceivedData({ name, photoUrl });
    }

    function onConnect() {
      setIsConnected(true);
    }

    function onDisconnect() {
      setIsConnected(false);
    }

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    socket.on("waiter:notfiyOrderIsDone", onDone);

    localStorage.setItem("table", JSON.stringify(table));

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.off("waiter:notfiyOrderIsDone", onDone);
    };
  }, [params.id, table]);

  function onOrder(name: string) {
    if (name == "Menu") {
      return;
      router.prefetch(`${params.id}/menu`);
    }

    setCallingName(name);
    setIsButtonPressed(true);
    setIsLoading(true);

    socket.emit("order:create", {
      type: name.toLowerCase(),
      restaurant_id: table.restaurant_id,
      table_id: params.id,
    });

    //   setTimeout(() => {
    //  waiter.emit("waiter:orderDone", {
    //    orderId: "64fe167e6ae14ba0ec34a086",
    //    name: "Hossam",
    //    photoUrl:
    //      "https://toppng.com/uploads/preview/user-account-management-logo-user-icon-11562867145a56rus2zwu.png",
    //  });
    //   } ,3000)

    // setTimeout(() => {
    //   setIsLoading((current) => !current);
    //   setIsOrderReceived((current) => !current);
    // }, 3000);
  }

  function onCardClick() {
    setIsOrderReceived(false);
    setIsButtonPressed(false);
  }

  return (
    <div className="parent relative">
      <div className={style.wrapper}>
        <NavBar />
        <Buttons
          style={{
            display: isButtonPressed ? "none" : "flex",
            animation: isButtonPressed ? "fade-in 1s" : "fade-out",
          }}
        >
          <Button
            name="Call Waiter"
            imageName="waiter"
            onClick={() => onOrder("Waiter")}
          ></Button>
          <Link href={`${pathname}/menu`}>
            <Button
              name="Menu"
              imageName="menu"
              onClick={() => onOrder("Menu")}
            ></Button>
          </Link>
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
          name={receivedData.name}
          tableNumber={table.number}
          imageLink={receivedData.photoUrl}
          style={{ display: isOrderReceived ? "flex" : "none" }}
          onClick={onCardClick}
        ></Received>
      </div>
      <div className={style.background}></div>
      {/* <Image
        className={style.steam}
        src="/order/images/steam.png"
        alt="steam"
        width={757}
        height={591}
      ></Image> */}
    </div>
  );
}
