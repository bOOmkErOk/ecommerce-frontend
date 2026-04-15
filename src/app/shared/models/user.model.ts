export interface User {
  id: number;
  name: string;
  email: string;
  phoneNumber: string;
  role: UserRole;
  isEmailVerified: boolean;
  addresses: Address[];
}

export interface Address {
  id: number;
  streetAddress: string;
  apartment: string;
  city: string;
}

export enum UserRole {
  User = 'User',
  Admin = 'Admin'
}