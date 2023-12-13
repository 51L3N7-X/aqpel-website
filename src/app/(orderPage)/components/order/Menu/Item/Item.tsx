"use client";
import { Item } from "@/app/(orderPage)/types";
import React from "react";
import Image from "next/image";
import styled from "styled-components";

export default function Item({ item }: { item: Item }) {
  const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    margin-top: ${item.ingredients ? "60px" : "70px"};
  `;
  
  return (
    <div className="relative h-[167px] w-[120px] rounded-2xl bg-[#FBFAF6] font-poppins shadow-[-1px_4px_4px_1px_rgba(172,172,172,0.25)]">
      <Image
        src="/menu/img.png"
        alt=""
        width={118}
        height={114}
        className="absolute -left-[24px] -top-[22px] rounded-[118px]"
      />
      {/* {item.imageUrl && <Image src={`http://localhost:3000/menu/img.png`} alt="" />} */}
      <div className="flex justify-end">
        <div className="ml-auto mr-[9px] mt-[10px]">
          <div className="flex flex-col flex-wrap gap-2">
            <Image
              src="/menu/Heart.svg"
              alt="add to fav"
              width={10}
              height={10}
              className="flex-shrink-0"
            ></Image>
            <Image
              src="/menu/shopping-cart.svg"
              alt="add to cart"
              width={10}
              height={10}
              className="flex-shrink-0"
            ></Image>
          </div>
        </div>
      </div>
      <div
        className={`texts mt-[${
          item.ingredients ? "60px" : "70px"
        }] flex flex-col items-center justify-center overflow-hidden`}
      >
        <div className="header-texts flex flex-col justify-center">
          <p className="text-[#313638} font-poppins text-[10px]">{item.name}</p>
          {item.ingredients && (
            <p className="text-[8px] font-medium text-[#8E8E8E]">
              Rice | Chickin | Nuts
            </p>
          )}
        </div>
        {item.calories && (
          <div className="flex flex-row items-center justify-center">
            <Image
              width={19}
              height={21}
              alt="Calories"
              src="/menu/fire.svg"
            ></Image>
            <p className="text-[8px] font-medium  text-[#8E8E8E]">
              {item.calories} Calories
            </p>
          </div>
        )}

        <div
          className={`fotter flex h-4 w-24 ${
            item.people ? "place-content-between" : "place-content-end"
          }`}
        >
          {item.people && (
            <p className="text-[8px] text-[#6E6E70]">
              {item.people} {item.people > "1" ? "Persons" : "Person"}
            </p>
          )}
          <p className={`text-[10px] font-semibold text-[#FFCC36] `}>
            {item.price} SR
          </p>
        </div>
      </div>
    </div>
  );
}
