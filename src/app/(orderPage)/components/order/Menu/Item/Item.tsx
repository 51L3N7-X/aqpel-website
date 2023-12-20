"use client";
import { Item } from "@/app/(orderPage)/types";
import React from "react";
import Image from "next/image";
import styled from "styled-components";

const TextContainer = styled.div<{ $item: Item }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  margin-top: ${(props) => (props.$item.ingredients ? "60px" : "70px")};
`;

const CaloriesContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const CaloriesText = styled.p`
  --tw-text-opacity: 1;
  font-size: 8px;
  font-weight: 500;
  color: rgb(142 142 142 / var(--tw-text-opacity));
`;

const PeopleText = styled.p`
  --tw-text-opacity: 1;
  font-size: 8px;
  color: rgb(142 142 142 / var(--tw-text-opacity));
`;

export default function Item({ item }: { item: Item }) {
  return (
    <div className="relative h-[167px] w-[120px] justify-self-center rounded-2xl bg-[#FBFAF6] font-poppins shadow-[-1px_4px_4px_1px_rgba(172,172,172,0.25)]">
      <Image
        src="/menu/img.png"
        alt=""
        width={118}
        height={114}
        className="absolute -left-[24px] -top-[22px] rounded-[118px]"
        style={{ width: "auto", height: "auto" }}
        priority
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
              style={{ width: "auto", height: "auto" }}
            ></Image>
          </div>
        </div>
      </div>
      <TextContainer $item={item}>
        <div className="header-texts flex flex-col items-center justify-center">
          <p className="text-[#313638} font-poppins text-[10px]">{item.name}</p>
          {item.ingredients && (
            <p className="text-[8px] font-medium text-[#8E8E8E]">
              Rice | Chickin | Nuts
            </p>
          )}
        </div>
        {item.calories && (
          <CaloriesContainer>
            <Image
              width={20}
              height={20}
              alt="Calories"
              src="/menu/fire.svg"
              style={{ width: "auto", height: "auto" }}
            ></Image>
            <CaloriesText className="text-[8px] font-medium  text-[#8E8E8E]">
              {item.calories} Calories
            </CaloriesText>
          </CaloriesContainer>
        )}

        <div className="fotter flex h-4 w-24 items-center justify-between ">
          {item.people && (
            <PeopleText className="text-[8px] text-[#6E6E70]">
              {item.people} {item.people > "1" ? "Persons" : "Person"}
            </PeopleText>
          )}
          <p className="ml-auto text-[10px] font-semibold text-[#FFCC36]">
            {item.price} SR
          </p>
        </div>
      </TextContainer>
    </div>
  );
}
