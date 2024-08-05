import { API_ENDPOINT } from "@/shared/constants";

export async function getProducts() {
  const res = await fetch(`${API_ENDPOINT}/products`, {
    cache: "no-store",
  });
  if (!res.ok) {
    return;
  }
  return res.json();
}
