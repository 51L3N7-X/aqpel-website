"use client";
import React, { use, useEffect, useState } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { NavLink } from "../NavLink/NavLink";
import Chiken from "@/../public/menu/chicken.svg";
import HeartIcon from "@/../public/menu/heartIcon.svg";
import CartIcon from "@/../public/menu/cartIcon.svg";
import HomeIcon from "@/../public/menu/home.svg";

export default function NavBar() {
  const [firstPathName, setFirstPathName] = useState("");
  const pathname = usePathname();
  useEffect(() => {
    setFirstPathName(pathname);
  }, []);
  return (
    <div className="shadow-[0_-2px_3px_0_rgba(190, 190, 190, 0.10)_inset,_0_4px_4px_0_rgba(0, 0, 0, 0.25)] navbar fixed bottom-2 left-0 z-50 ml-[1%] mr-[1%] w-[98%] rounded-3xl">
      <div className="relative flex w-full justify-between">
        <div className="left my-[18px] flex w-1/3  justify-around">
          <NavLink
            exact
            href={firstPathName.substring(0, pathname.lastIndexOf("/"))}
          >
            <HomeIcon></HomeIcon>
          </NavLink>
          <NavLink exact href={firstPathName}>
            <Chiken></Chiken>
          </NavLink>
        </div>
        <div className="logo absolute left-1/2 flex -translate-x-1/2 transform items-center justify-center bg-yellow1">
          <div className="relative mr-2 h-[80%] w-[80%]">
            <Image src="/menu/waiterIcon.svg" fill alt="Call Waiter" />
          </div>
        </div>
        <div className="right my-[18px] flex w-1/3 justify-around">
          <NavLink exact href={`${firstPathName}/favourites`}>
            <HeartIcon></HeartIcon>
          </NavLink>
          <NavLink exact href={`${firstPathName}/cart`}>
            <CartIcon></CartIcon>
          </NavLink>
        </div>
      </div>
    </div>
  );
}
