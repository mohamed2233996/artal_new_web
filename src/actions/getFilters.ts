import { API_ENDPOINT } from "@/shared/constants";

export async function getFilterPrices() {
  const res = await fetch(`${API_ENDPOINT}/store/filter`, {
    cache: "no-store",
  });
  if (!res.ok) {
    return;
  }
  return res.json();
}
