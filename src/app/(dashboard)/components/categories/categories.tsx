import React from "react";
import { useState } from "react";
import Link from "next/link";
import ItemButton from "../ItemButton/ItemButton";

interface categorie {
  name: string;
  imageUrl: string;
  description: string;
}

export default function Categories({
  categories,
  dispatchCategories,
  ids,
}: {
  categories: any;
  dispatchCategories: any;
  ids: { restaurant: string; menu: string };
}) {
  console.log(categories)
  const [isAdding, setIsAdding] = useState(false);
  const [addCategoryBody, setAddCategoryBody] = useState<categorie>({
    imageUrl: "",
    name: "",
    description: "",
  });

  const onAddCategory = async (e: any) => {
    e.preventDefault();
    const token: any = localStorage.getItem("token");
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/restaurant/${ids.restaurant}/menu/${ids.menu}/categories`,
      {
        method: "POST",
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(addCategoryBody),
      }
    );

    const data = await response.json();
    if (data?.success == false) return alert(data?.message);

    setIsAdding(false);
    dispatchCategories({ type: "added", payload: data, id: data._id });
  };

  if (isAdding) {
    return (
      <div>
        <h1>Add Category</h1>

        <form onSubmit={onAddCategory}>
          <label>Category Name :</label>
          <br />
          <input
            type="text"
            required
            onChange={(e) =>
              setAddCategoryBody({
                ...addCategoryBody,
                name: e.target.value,
              })
            }
          />
          <br />
          <label>Category Description :</label>
          <input
            type="text"
            onChange={(e) =>
              setAddCategoryBody({
                ...addCategoryBody,
                description: e.target.value,
              })
            }
          ></input>
          <br />
          <label>Category Image URL</label>
          <input
            type="text"
            onChange={(e) =>
              setAddCategoryBody({
                ...addCategoryBody,
                imageUrl: e.target.value,
              })
            }
          ></input>
          <button type="submit">+ Add</button>
        </form>
      </div>
    );
  }
  return (
    <div className="">
      <p>
        <Link href={"/dashboard/restaurant/" + ids.restaurant}>
          Back to the Menu
        </Link>
        <br />
        <Link href="/dashboard">Back to the Dashboard</Link>
      </p>

      <h1>The Categories</h1>
      {categories.map(
        //@ts-ignore
        (categorie, index) => {
          // console.log(categorie)
          return <ItemButton data={categorie} key={index}></ItemButton>;
        }
      )}
      <button onClick={() => setIsAdding(true)}>Add Category</button>
    </div>
  );
}
