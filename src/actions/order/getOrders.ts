import { API_ENDPOINT } from "@/shared/constants";

export async function getOrders(token: string): Promise<any[] | undefined> {
  const res = await fetch(`${API_ENDPOINT}/orders/me`, {
    method: "GET",
    headers: {
      authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    cache: "no-store",
  });
  if (!res.ok) {
    return;
  }
  return res.json();
}
