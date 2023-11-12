"use client";
import React from 'react'
import Link from 'next/link';
import { useQuery } from 'react-query';
import { useState } from 'react';
import { useRouter } from 'next/navigation';


interface menu {
  restaurant_name: string,
  name: string,
}

export default function Page({ params }: { params: { restaurantId: string } }) {
  const router = useRouter()
  const [menu, setMenu] = useState<menu>({ restaurant_name: "", name: "" })

  const response = useQuery("data", async () => {
    const token: any = localStorage.getItem("token")
    const data: any = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/restaurant/${params.restaurantId}/menu`, {
      method: "GET",
      headers: {
        Authorization: token,
      },
    }).then((res) => res.json());

    if (!data?.success && data?.message == "Unauthorized") {
      localStorage.clear()
      return router.push("/signin");
    }

    console.log(data);

    setMenu(data);
    return data;
  });


  //   useEffect(() => {
  //     // setToken(localStorage.getItem("token"))
  //   if (!data?.data?.success && data?.data?.message == "Unauthorized") {
  //     localStorage.clear()
  //     return router.push("/signin");
  //   }

  //   setRestaurant(data?.data);
  // }, [])


  if (response.isLoading) return <div>Loading...</div>;
  return (
    <div>
      <p><Link href="/dashboard/restaurant">Back To The Restaurant</Link></p>

      <h1>The Menu</h1>
    </div>
  )
}
