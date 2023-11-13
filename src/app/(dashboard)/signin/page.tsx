"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import SingIn from "../components/singin/singin";


export default function SingInPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) return router.push("/dashboard");
    setLoading(false);
  }, [router]);

  return loading ? <div>loading...</div> : <SingIn></SingIn>;
}
