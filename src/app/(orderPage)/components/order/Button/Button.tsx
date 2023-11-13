"use client"

import React from "react";
import style from "./Button.module.css";
import Image from "next/image";
import { HTMLAttributes } from "react";

interface props extends HTMLAttributes<HTMLElement> {
  name: string,
  imageName : string,
}

export default function Button({
  name,
  imageName,
  ...props
}: props) : JSX.Element {
  return (
    <div className={style.btn} {...props}>
      <div className={style.image}>
        <Image
          src={`/order/images/${imageName}.svg`}
          alt={name}
          height={90}
          width={90}
        ></Image>
      </div>

      <p className={style.btn_text}>{name}</p>
    </div>
  );
}
