import { Product } from "@/types/Product";
import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: number;
      cart: {
        id: string;
        totalPrice: number;
        cartItems: {
          product: Product;
          quantity: number;
          id: number;
        }[];
      };
      favourites: { product: Product; productId: string }[];
      role: string;
      username: string;
    };
    token: string;
  }
}

import { JWT } from "next-auth/jwt";

declare module "next-auth/jwt" {
  interface JWT {
    user: {
      id: number;
      cart: {
        id: string;
        totalPrice: number;
        cartItems: {
          product: Product;
          quantity: number;
          id: number;
        }[];
      };
      favourites: { product: Product; productId: string }[];
      role: string;
      username: string;
    };
    token: string;
  }
}
