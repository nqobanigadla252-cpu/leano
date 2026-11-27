export type Product = {
  id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  status: "Active" | "Draft";
  description: string;
  image: string;
};

export type Order = {
  id: string;
  customer: string;
  items: number;
  total: number;
  status: "Pending" | "Paid" | "Shipped" | "Delivered" | "Cancelled";
  date: string;
  channel: string;
  createdAt?: string;
};

export type Customer = {
  id: string;
  name: string;
  email: string;
  orders: number;
  spent: number;
  location: string;
  joined: string;
};

export type ShippingZone = {
  id: string;
  name: string;
  regions: string;
  rate: number;
  freeOver: number | null;
  enabled: boolean;
  eta: string;
};
