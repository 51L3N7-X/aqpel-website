export interface Store {
  _id: string;
  name: string;
  price: string;
  imageUrl?: string;
}

import { ItemType } from "@/app/(orderPage)/types";

export class FavStore {
  private store: Array<ItemType>;
  restaurant_id: string;

  constructor(store?: string) {
    this.restaurant_id = localStorage.getItem("restaurant_id")!;
    if (localStorage.getItem(`${this.restaurant_id}_favourites`)) {
      this.store = JSON.parse(
        localStorage.getItem(`${this.restaurant_id}_favourites`)!,
      );
    } else {
      localStorage.setItem(
        `${this.restaurant_id}_favourites`,
        JSON.stringify([]),
      );
      this.store = JSON.parse(
        localStorage.getItem(`${this.restaurant_id}_favourites`)!,
      );
    }
  }

  isLiked(itemId: string): boolean {
    const item = this.getItem(itemId);
    if (item) return true;
    return false;
  }

  getItem(itemId: string) {
    return this.store?.find((o) => o._id == itemId);
  }

  addItems(items: Array<any>) {
    this.deleteAll();
    return this.setItemInLocalStorage(items);
  }

  addItem(item: ItemType) {
    this.store?.push(item);
    this.setItemInLocalStorage(this.store);
    return this.getAll();
  }

  getAll() {
    return this.store;
  }

  deleteItem(itemId: string) {
    this.store = this.store?.filter((item) => item._id !== itemId);
    return this.setItemInLocalStorage(this.store);
  }

  deleteAll() {
    localStorage.removeItem(`${this.restaurant_id}_favourites`);
    return {};
  }

  editItem(itemId: string, item: ItemType) {
    let index = this.store?.findIndex((obj) => obj._id == itemId);

    this.store[index] = item;

    return this.setItemInLocalStorage(this.store);
  }

  setItemInLocalStorage(item: any) {
    localStorage.setItem(
      `${this.restaurant_id}_favourites`,
      JSON.stringify(item),
    );
    return this.getAll();
  }
}
