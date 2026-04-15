import { Product } from "./product.model";

export interface Order {
  id: number;
  createdAt: string;
  status: OrderStatus;
  orderItems: OrderItem[];
}

export interface OrderItem {
  id: number;
  quantity: number;
  price: number;
  product: Product;
}

export enum OrderStatus {
  Pending = 'Pending',
  Shipped = 'Shipped',
  Delivered = 'Delivered',
  Cancelled = 'Cancelled'
}