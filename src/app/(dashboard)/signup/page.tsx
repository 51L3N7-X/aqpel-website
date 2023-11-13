"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import SingUp from "../components/signup/signup";

export default function SingUpPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) return router.push("/dashboard");
    setLoading(false);
  }, [router]);

  return loading ? <div>loading...</div> : <SingUp></SingUp>;
}
