import { API_ENDPOINT } from "@/shared/constants";
import { unstable_noStore } from "next/cache";

export async function getCart(token: string): Promise<any[] | undefined> {
  unstable_noStore;
  const res = await fetch(`${API_ENDPOINT}/cart`, {
    method: "GET",
    headers: {
      authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    return;
  }
  return res.json();
}

