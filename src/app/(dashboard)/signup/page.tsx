"use client"
import { redirect } from 'next/navigation';
import React from 'react'

export default function page() {
    "use client"
 const token = localStorage.getItem("token");
 if(token) redirect("dashboard");
  return (
    <div>signup</div>
  )
}
