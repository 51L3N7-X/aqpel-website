"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import Code from "../codePage/code";
import Link from "next/link";

export default function SingUp() {
  const router = useRouter();
  const [data, setData] = useState<any>({});
  const [isCode, setIsCode] = useState<any>("");
  const [code, setCode] = useState<any>("");
  const [error, setError] = useState("");

  const onSubmitFunction = async (e: any) => {
    e.preventDefault();

    let code: any = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/user/send-code`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          phone: data.phone,
        }),
      }
    );

    code = await code.json();
    if (!code.success) return alert(code.message);
    setCode(code.code);
    setIsCode(true);
  };

  const onCodeSubmit = async (e: any) => {
    e.preventDefault();

    let token: { success: boolean; message: string } | any = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/user/register`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );
    token = await token.json();

    if (!token.success) {
      alert(token.message);
      return;
    }

    if (token.success) {
      localStorage.setItem("token", token.token);
      return router.push("/dashboard");
    }
  };

  if (isCode)
    return (
      <Code
        code={code}
        data={data}
        onCodeSubmit={onCodeSubmit}
        setData={setData}
      ></Code>
    );

  return (
    <div id="signup">
      <h1>Sign Up</h1>
      <form onSubmit={onSubmitFunction}>
        <label>Username</label>
        <input
          type="text"
          onChange={(e) =>
            setData({
              ...data,
              username: e.target.value,
            })
          }
        />
        <br />
        <label>Password</label>
        <input
          type="password"
          onChange={(e) =>
            setData({
              ...data,
              password: e.target.value,
            })
          }
        ></input>
        <br />
        <label>Email</label>
        <input
          type="text"
          onChange={(e) =>
            setData({
              ...data,
              email: e.target.value,
            })
          }
        ></input>
        <br />
        <label>Phone Number</label>
        <input
          type="text"
          onChange={(e) =>
            setData({
              ...data,
              phone: e.target.value,
            })
          }
        ></input>
        <br />
        <button type="submit">SignUp</button>
      </form>
      <p>
        Or <Link href="/signin">Sign In</Link>
      </p>
    </div>
  );
}
