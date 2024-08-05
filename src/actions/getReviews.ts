import { API_ENDPOINT } from "@/shared/constants";

export async function getReviews(productId: string) {
  const res = await fetch(`${API_ENDPOINT}/reviews/product/${productId}`, {
    cache: "no-store",
  });
  if (!res.ok) {
    return;
  }
  return res.json();
}
