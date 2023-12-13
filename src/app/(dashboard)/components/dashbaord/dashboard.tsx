import React from "react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";

export default function Dashboard({ user }: { user: any }) {
  return (
    <div className="dashboard">
      <h1>Welcome {user.username}</h1>
      <button>
        <Link href="/dashboard/restaurant">The Restaurant</Link>
      </button>
      <button>
        <Link href="/dashboard/tables">The Tables</Link>
      </button>
      <button>
        <Link href="/dashboard/waiters">The Waiters</Link>
      </button>
      <button>
        <Link href="/dashboard/kitchen">The Kitchen</Link>
      </button>
    </div>
  );
}
