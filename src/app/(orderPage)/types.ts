export type Items = Array<Item>;

export interface Item {
  name: string;
  price: string;
  description?: string;
  calories?: string;
  people?: string;
  new?: boolean;
  special?: boolean;
  imageUrl?: string;
  id?: string;
  ingredients?: string;
}
