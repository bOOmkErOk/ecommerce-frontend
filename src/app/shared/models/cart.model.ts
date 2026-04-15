import { Product } from "./product.model";

export interface Cart {
  id: number;
  items: CartItem[];
}

export interface CartItem {
  id: number;
  quantity: number;
  product: Product;
}