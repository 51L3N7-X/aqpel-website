"use client";

import React from "react";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function SingIn() {
  const router = useRouter();
  const [data, setData] = useState<{ username: string; password: string }>({
    username: "",
    password: "",
  });

  const onSubmit = async (e: any) => {
    e.preventDefault();
    console.log(data);
    let token: any = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/user/login`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );

    token = await token.json();

    if (!token.success) return alert(token.message);
    localStorage.setItem("token", token.token);
    router.push("/dashboard");
  };

  return (
    <div className="singin">
      <h1>SingIn</h1>
      <form onSubmit={onSubmit}>
        <label>UserName or Email</label>
        <input
          type="text"
          onChange={(e) =>
            setData({
              ...data,
              username: e.target.value,
            })
          }
        />
        <label>Password</label>
        <input
          type="text"
          onChange={(e) =>
            setData({
              ...data,
              password: e.target.value,
            })
          }
        />
        <button type="submit">Sign In</button>
      </form>
      <p>
        Or <Link href="/signup">Sign Up</Link>
      </p>
    </div>
  );
}
