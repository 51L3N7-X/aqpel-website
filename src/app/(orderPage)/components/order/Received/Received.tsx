import React from "react";
import style from "./Received.module.css";
import Image from "next/image";
import styles from "./Received.module.css";

export default async function Received({
  imageLink,
  tableNumber,
  name,
  style,
  onClick
}: {
  imageLink: string;
  tableNumber: string;
  name: string;
  style: {};
  onClick: () => void;
}) {
  return (
    <div className={styles.container} style={style} onClick={onClick}>
      <Image className={styles.img} src={imageLink} alt="waiter" width={119} height={119}></Image>
      <div className={styles.contentContainer}>
        <h2 className={styles.name}>{name}</h2>
        <p className={styles.contentText}>Table {tableNumber}</p>
        <p className={styles.contentText}>Coming Now</p>
      </div>
    </div>
  );
}
