import { Product } from "./product.model";

export interface WishlistItem {
  id: number;
  createdAt: string;
  product: Product;
}

export interface ToggleWishlistResponse {
  data: boolean;
  success: boolean;
  message?: string;
}