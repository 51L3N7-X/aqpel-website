"use client";
import React, { useState, useEffect, Dispatch } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import IncreaseItems from "../IncreaseItems/IncreaseItems";
import Return from "../icons/return.svg";
import EmptyHeart from "../icons/emptyHeart.svg";
import Image from "next/image";
import FilledHeart from "../icons/filledHeart.svg";
import { FavStore } from "@/app/(orderPage)/order/[id]/menu/utils/favourites";
import { ItemType } from "@/app/(orderPage)/types";
import { CartItem } from "@/app/(orderPage)/order/[id]/menu/utils/cart";

export default function ItemTopBar({
  item,
  tempCart,
  setTempCart,
  number,
  setNumber,
  setLikeClicked,
}: {
  item: ItemType;
  tempCart: (obj: CartItem) => CartItem;
  setTempCart: Dispatch<(obj: CartItem) => CartItem>;
  number: number;
  setNumber: (number: any) => any;
  setLikeClicked: Dispatch<boolean>;
}) {
  const pathname = usePathname();
  const [liked, setLiked] = useState(false);
  const [store, setStore] = useState<FavStore>();

  useEffect(() => {
    let s = new FavStore();
    setStore(s);
    setLiked(new FavStore().isLiked(item._id));
  }, []);

  const likeItem = () => {
    setLiked((state) => {
      if (!state) {
        store?.addItem(item);
        setLikeClicked(true);
        setTimeout(() => {
          setLikeClicked(false);
        }, 1500);
      } else {
        store?.deleteItem(item._id);
      }
      return !state;
    });
  };

  return (
    <div className="relative h-[45vh] w-full rounded-b-3xl shadow-[-1px_4px_4px_1px_rgba(172,172,172,0.25)]">
      <div className="absolute left-1/2 top-1/2 z-50 -translate-x-1/2 -translate-y-1/2 rounded-[128px]">
        {item.imageUrl && (
          <Image
            width={265}
            height={265}
            alt="item Image"
            src={item.imageUrl}
            className="rounded-full"
          ></Image>
        )}
      </div>
      <Link
        href={pathname.substring(0, pathname.lastIndexOf("/"))}
        className="z-10"
      >
        <div className="absolute left-6 top-9 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-yellow1 bg-no-repeat">
          <Return />
        </div>
      </Link>
      <div
        className="absolute right-6 top-9 z-10 flex h-11 w-11 items-center justify-center rounded-full"
        onClick={likeItem}
      >
        {liked ? <FilledHeart></FilledHeart> : <EmptyHeart></EmptyHeart>}
      </div>
      <div
        className="absolute left-0 top-0 h-full w-full bg-cover bg-fixed bg-center opacity-10"
        style={{ backgroundImage: `url("/menu/foodbackground.png")` }}
      ></div>
      <div className="addItems absolute -bottom-[5%] right-1/2 z-10 translate-x-1/2">
        <IncreaseItems
          item={item}
          tempCart={tempCart}
          setTempCart={setTempCart}
          number={number}
          setNumber={setNumber}
        ></IncreaseItems>
      </div>
    </div>
  );
}
