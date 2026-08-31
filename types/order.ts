export type OrderStatus =
  | "Pending"
  | "Processing"
  | "Completed"
  | "Cancelled"
  | "Confirmed";

export interface Order {
  _id: string;
  photo?: string;
  name: string;
  address: string;
  products: number | string;
  price: number | string;
  order_date: string;
  status: OrderStatus;
}

export type OrdersResponse = Order[];
