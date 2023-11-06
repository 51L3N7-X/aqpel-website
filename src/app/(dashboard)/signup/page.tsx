"use client"

import { redirect } from 'next/navigation';
import { useState, useEffect } from "react"

export default function Page() {
    const [token, setToken] = useState<string | null>();

    useEffect(() => {
        const token = localStorage.getItem("token");
        setToken(token);
    }, []);

    if (token) redirect("dashboard");
    return (
        <div>signup</div>
    )
}
