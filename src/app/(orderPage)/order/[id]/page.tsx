"use client";

import Link from "next/link";
import { notFound } from "next/navigation";
import { useEffect } from "react";
import Image from "next/image";
// export const dynamicParams = false;

// export async function generateStaticParams() {
//   return [{ id: "1" }, { id: "2" }];
// }

function fetchTable(id: string) {
  console.log("test");
  //TODO: fetch table from api
  return true;
}

export default function Test({ params }: { params: { id: string } }) {
  useEffect(() => {
    const table = fetchTable(params.id);
    if (!table) return notFound();
  });

  return (
    <>
      <div className="container">
        <nav className="navbar">
          <Image
            alt=""
            src="/order/images/logo.svg"
            height={44}
            width={44}
          ></Image>
          <Image
            alt=""
            src="/order/images/menu.svg"
            height={44}
            width={44}
          ></Image>
        </nav>
      </div>
    </>
  );
}
