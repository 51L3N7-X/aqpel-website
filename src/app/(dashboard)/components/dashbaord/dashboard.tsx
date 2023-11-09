import React from "react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Dashboard({user} : {user : any}) {
  return (
    <div className="dashboard">
        <h1>Welcom {user.username}</h1>
    </div>
  )
}
