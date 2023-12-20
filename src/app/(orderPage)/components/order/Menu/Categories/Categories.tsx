import React from "react";
import CategorieItem from "./CategorieItem";

export default function Categories({
  categoriesItems,
}: {
  categoriesItems?: string[];
}) {
  return (
    <div className="">
      <p className="text-base font-semibold text-[#313638] mb-[9px]">Categories</p>
      <div className="categoriesItems flex items-center justify-start gap-x-2 mx-auto overflow-x-scroll pb-1">
        <CategorieItem name="All"></CategorieItem>
        {["test", "test1", "test2" , "test4" , "test5" , "test6"].map((item) => (
          <CategorieItem name={item} key={item} imageURL="/menu/categoryImage2.jpg"></CategorieItem>
        ))}
      </div>
    </div>
  );
}
