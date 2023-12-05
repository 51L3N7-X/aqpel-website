export interface table {
  number: number;
  description?: string;
  restaurant_name: string | null;
  palce?: string;
  sendTo?: string;
  code?: string;
  restaurant_id: string;
  id?: string;
}

export interface menu {
  restaurant_name?: string;
  name: string | any;
}

export interface categorie {
  name: string;
  imageUrl: string;
  description: string;
}

export interface item {
  name: string;
  price: string;
  description?: string;
  calories?: string;
  people?: string;
  new?: boolean;
  special?: boolean;
  imageUrl?: string;
  id?: string;
}

export interface restaurant {
  name?: string;
  _id?: string;
  description?: string;
}

export interface Waiter {
  restaurant_name: string | null;
  username: string;
  password: string;
  name?: string;
  photoUrl?: string;
  active?: boolean;
  _id?: string;
  tables: Array<string>;
}

export interface kitchen {
  restaurant_name: string;
  username: string;
  password: string;
}
