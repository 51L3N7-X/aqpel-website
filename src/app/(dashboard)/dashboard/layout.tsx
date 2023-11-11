"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {QueryClient , QueryClientProvider} from "react-query";


export default function Dashboard({ children }: { children: React.ReactNode }) {
  // const router = useRouter();
  // const [isAccessAble, setIsAccessAble] = useState<Boolean>(false);

  // useEffect(() => {
  //   checkUser(localStorage.getItem("token"));
  // }, []);
  // const checkUser = async (token: string | null) => {
  //   if (!token) return router.push("/signin");

  //   let user: any = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/`, {
  //     method: "GET",
  //     headers: {
  //       Authorization: token,
  //     },
  //   });

  //   user = await user.json();
  //   if (user.success == false && user.message == "Unauthorized") {
  //     localStorage.clear();
  //     return router.push("/singin");
  //   }

  //   setIsAccessAble(true);
  // };
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <div>{children}</div>
    </QueryClientProvider>
  );
}
