import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

export async function getApi(url: string, router: AppRouterInstance) {
  const token: any = window.localStorage.getItem("token");
  let data: any = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${url}`, {
    method: "GET",
    headers: {
      Authorization: token,
    },
  }).then((res) => res.json());

  if (!data?.success && data?.message == "Unauthorized") {
    window.localStorage.clear();
    return router.push("/signin");
  }

  if (url == "/restaurant")
    window.localStorage.setItem("restaurant_name", data?.name);
  return data;
}
