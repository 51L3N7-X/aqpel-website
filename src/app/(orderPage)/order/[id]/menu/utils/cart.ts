export type CartItem = {
  name: string;
  quanity: number;
  price: number;
  _id: string;
  image?: string;
};

interface CartStoreType {
  totalPrice: number;
  store: CartItem[];
  restaurant_id: string;

  addItem(item: CartItem): CartItem[];
  getAll(): CartItem[];
  deleteAll(): void;
  deleteItem(itemId: string): CartItem[];
  editItem(itemId: string, item: CartItem): CartItem[];
  getTotalPrice(): number;
  getItem(itemId: string): CartItem | undefined;
}

export class CartStore implements CartStoreType {
  totalPrice: number;
  store: CartItem[];
  restaurant_id: string;

  constructor() {
    this.restaurant_id = localStorage.getItem("restaurant_id")!;
    this.totalPrice = 0;
    if (localStorage.getItem(`${this.restaurant_id}_cart`)) {
      this.store = JSON.parse(
        localStorage.getItem(`${this.restaurant_id}_cart`)!,
      );
    } else {
      localStorage.setItem(`${this.restaurant_id}_cart`, JSON.stringify([]));
      this.store = JSON.parse(
        localStorage.getItem(`${this.restaurant_id}_cart`)!,
      );
    }
  }

  addItem(item: CartItem) {
    let previousItem = this.getItem(item._id);
    if (previousItem) {
      this.editItem(item._id, {
        ...previousItem,
        quanity: item.quanity + previousItem.quanity,
      });
      return this.getAll();
    } else {
      this.store.push(item);
      this.putInStore(this.store);
      return this.getAll();
    }
  }

  getItem(itemId: string) {
    return this.store.find((o) => o._id == itemId);
  }

  getAll(): CartItem[] {
    return this.store;
  }

  deleteAll(): void {
    localStorage.removeItem(`${this.restaurant_id}_cart`);
  }

  deleteItem(itemId: string): CartItem[] {
    this.store = this.store.filter((item) => item._id !== itemId);
    return this.store;
  }

  editItem(itemId: string, item: CartItem): CartItem[] {
    const index = this.store.findIndex((obj) => obj._id == itemId);
    this.store[index] = item;
    this.putInStore(this.store);
    return this.store;
  }

  getTotalPrice(): number {
    let price = 0;
    this.store.map((itm) => {
      price += itm.quanity * itm.price;
    });
    return price;
  }

  putInStore(item: CartItem[]) {
    localStorage.setItem(`${this.restaurant_id}_cart`, JSON.stringify(item));
  }
}
