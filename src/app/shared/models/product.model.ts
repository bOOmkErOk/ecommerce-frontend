export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  imageUrl: string;
  discountPercent: number;
  isOnSale: boolean;
  category: Category;
  stock: number;
  totalSold: number;
  averageRating: number;
  ratings: Rating[];
  isSponsored: boolean;
  sponsoredUntil?: string;
}

export interface Rating {
  id: number;
  value: number;
  userId: number;
}

export enum Category {
  Phones = 'Phones',
  Computers = 'Computers',
  SmartWatch = 'SmartWatch',
  Camera = 'Camera',
  HeadPhones = 'HeadPhones',
  Gaming = 'Gaming'
}