import { Cart } from "@/store";
import { formatCurrency } from "./formatCurrency";

export const calculateSubtotalPrice = (cart: Cart, isformatCurrency: boolean)=> {
  let total = 0;
  cart?.forEach((p) => (total += p.price * p.quantity));
  return isformatCurrency ? formatCurrency(total) : total;
};
