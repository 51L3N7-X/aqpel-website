"use client";
import ItemTopBar from "@/app/(orderPage)/components/order/Menu/ItemTopBar/ItemTopBar";
import ItemsTextsContainer from "@/app/(orderPage)/components/order/Menu/itemTextsContainer/ItemsTextsContainer";
import React, { useEffect, useState } from "react";
import { ItemType } from "@/app/(orderPage)/types";
import BottomButton from "@/app/(orderPage)/components/order/Menu/BottomButton/BottomButton";
import Cart from "@/../public/menu/cartIcon.svg";
import { CartItem, CartStore } from "../utils/cart";
import Alert from "@/app/(orderPage)/components/order/Menu/Alert/Alert";
import { AnimatePresence } from "framer-motion";
import FilledHeart from "@/../public/menu/filledHeart.svg";

export default function ItemPage({ item }: { item: ItemType }) {
  const [cartClicked, setCartClicked] = useState(false);

  const [likeClicked, setLikeClicked] = useState(false);

  const [number, setNumber] = useState(1);

  const initialState = {
    name: item.name,
    price: +item.price,
    quanity: number,
    _id: item._id,
  };

  const [tempCartItem, setTempCartItem] = useState<(obj: CartItem) => CartItem>(
    (obj: CartItem) => initialState,
  );

  console.log(tempCartItem);

  const onClickAddToCart = () => {
    const cart = new CartStore();
    //@ts-ignore
    cart.addItem(tempCartItem);

    console.log(cart.getAll());

    setNumber(() => 1);
    setTempCartItem(() => initialState);
    setCartClicked(true);
    setTimeout(() => {
      setCartClicked(false);
    }, 1500);
  };

  return (
    <>
      <ItemTopBar
        item={item}
        tempCart={tempCartItem}
        setTempCart={setTempCartItem}
        number={number}
        setNumber={setNumber}
        setLikeClicked={setLikeClicked}
      ></ItemTopBar>
      <ItemsTextsContainer item={item}></ItemsTextsContainer>
      <AnimatePresence>
        {cartClicked && (
          <Alert
            title="Added To Cart"
            Icon={<Cart style={{ fill: "white" }}></Cart>}
          ></Alert>
        )}
        {likeClicked && (
          <Alert
            title="Added To Favourites"
            Icon={<FilledHeart></FilledHeart>}
          ></Alert>
        )}
      </AnimatePresence>
      <BottomButton
        title="Add to cart"
        Icon={<Cart style={{ fill: "white" }}></Cart>}
        onClick={onClickAddToCart}
      ></BottomButton>
    </>
  );
}
