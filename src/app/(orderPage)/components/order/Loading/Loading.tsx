import React from "react";
import { Player } from "@lottiefiles/react-lottie-player";
import styles from "./Loading.module.css";

export default function Loading({ name, style }: { name: string; style: {} }) {
  return (
    <div style={style} className={styles.container}>
      <Player
        loop
        autoplay
        src="/order/lotties/loading.json"
        style={{ width: 300 + "px", height: 300 + "px" }}
      ></Player>
      <p className={styles.loading_text}>Calling The {name}</p>
      <button className={styles.btn}>Cancel calling</button>
    </div>
  );
}
