import React from "react";
import Image from "next/image";

export default function Fotter() {
  return (
    <div className="shadow-[0_-2px_3px_0_rgba(190, 190, 190, 0.10)_inset,_0_4px_4px_0_rgba(0, 0, 0, 0.25)] navbar fixed bottom-2 left-0 ml-[1%] mr-[1%] w-[98%] rounded-3xl">
      <div className="relative flex w-full justify-between">
        <div className="left my-[18px] flex w-1/3  justify-around">
          <Image width={32} height={32} alt="home" src="/menu/home.svg"></Image>
          <Image
            width={32}
            height={32}
            alt="menu"
            src="/menu/chicken.svg"
          ></Image>
        </div>
        <div className="logo absolute left-1/2 flex -translate-x-1/2 transform items-center justify-center bg-yellow-400">
          <div className="relative mr-2 h-[80%] w-[80%]">
            <Image
              src="/menu/waiterIcon.svg"
              fill
              alt="Call Waiter"
             
            />
          </div>
        </div>
        {/* 92/2 */}
        <div className="right my-[18px] flex w-1/3 justify-around">
          <Image
            width={32}
            height={32}
            alt="Favorites"
            src="/menu/heartIcon.svg"
          ></Image>
          <Image
            width={32}
            height={32}
            alt="menu"
            src="/menu/cartIcon.svg"
          ></Image>
        </div>
      </div>
    </div>
  );
}
