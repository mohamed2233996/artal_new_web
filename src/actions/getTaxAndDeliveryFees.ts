import { API_ENDPOINT } from "@/shared/constants";

export type TaxAndDeliveryFeesData = {
  tax: number;
  freeAfter: string;
  bahrainDelivery: string;
  worldwideDelivery: string;
}

/**
 * @description
 */
export async function getTaxAndDeliveryFees(): Promise<TaxAndDeliveryFeesData> {
  const res = await fetch(`${API_ENDPOINT}/store/tax`);
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}