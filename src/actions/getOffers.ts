import { API_ENDPOINT } from "@/shared/constants";
import { Offer } from "@/types/about";
import { unstable_noStore } from "next/cache";

export async function getOffers(): Promise<Offer[] | undefined> {
  unstable_noStore();
  const res = await fetch(`${API_ENDPOINT}/about/offers`);
  if (!res.ok) {
    return;
  }
  return res.json();
}
