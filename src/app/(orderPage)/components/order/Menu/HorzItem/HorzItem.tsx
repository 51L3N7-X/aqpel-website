import React from "react";

export default function HorzItem({
  name,
  price,
}: {
  name: string;
  price: string;
}) {
  return (
    <div className="relative rounded-l-[28px] rounded-r-2xl shadow-[0px_2px_4px_1px_rgba(0,0,0,0.18)] bg-white2">
      <div className="mx-4 flex items-center">
        <h2 className="text-base font-semibold text-text">{name}</h2>
        <h2 className="text-lg font-semibold text-yellow1">{price}</h2>
      </div>
    </div>
  );
}
