"use server";

import { notFound } from "next/navigation";
import Order from "../../components/order/Order/Order";

// export const dynamicParams = false;

// export async function generateStaticParams() {
//   return [{ id: "1" }, { id: "2" }];
// }

async function getData(id: string) {
  const res = await fetch(`https://aqpelv2.jjjjkkjjjjkkm.repl.co/v1/${id}`);

  if (!(res.status == 200)) return notFound();

  return res.json();
}


export default async function Page({ params }: { params: { id: string } }) {
const data = await getData(params.id);
return <Order params={params} table={data.table}></Order>
}
