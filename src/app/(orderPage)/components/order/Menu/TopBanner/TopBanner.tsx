import React from "react";
import Image from "next/image";
import { css } from "@emotion/react";

export default function TopBanner({ points }: { points?: string }) {
  return (
    <div className="min-w-[350px] overflow-hidden rounded-b-[20px] bg-[#1B1E21]">
      <div className="navBar mx-auto mt-8 flex max-w-[396px] items-center justify-between">
        <Image
          src="/order/images/logo.svg"
          alt="logo"
          height={44}
          width={44}
        ></Image>
        <Image
          src="/order/images/burger-menu.svg"
          alt="menu"
          height={44}
          width={44}
        ></Image>
      </div>
      {points && (
        <div className="flex max-w-[396px] items-center justify-between text-[#F5F5F5]">
          <p className="text-base font-semibold">Your Points</p>
          <p className="text-base font-semibold">{points} SR</p>
        </div>
      )}
    </div>
  );
}
