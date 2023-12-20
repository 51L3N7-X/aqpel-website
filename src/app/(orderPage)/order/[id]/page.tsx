"use server";

import { notFound } from "next/navigation";
import Order from "../../components/order/OrderPage/Order/Order";

// export const dynamicParams = false;

// export async function generateStaticParams() {
//   return [{ id: "1" }, { id: "2" }];
// }

async function getData(id: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/${id}`);

  if (!(res.status == 200)) return notFound();

  const response = await res.json();
  if (response.table == null) return notFound();
  if (!response) return notFound();
  return response;
}

export default async function Page({ params }: { params: { id: string } }) {
  const data = await getData(params.id);
  console.log("data", data);
  return <Order params={params} table={data.table}></Order>;
}
