import React from "react";
import Link from "next/link";
import { useQuery } from "react-query";
import { useEffect } from "react";

export default function Restaurant(/*{restaurant} : {restaurant: any}*/) {
 
 

  return (
    <div className="restaurant">
      <p>
        <Link href="/dashboard">Back to the Dashboard</Link>
      </p>

      <h1>The Restaurant</h1>
    </div>
  );
}
