import { API_ENDPOINT } from "@/shared/constants";
import { unstable_noStore } from "next/cache";

export async function getInstagramImages() {
  unstable_noStore();
  const res = await fetch(`${API_ENDPOINT}/about/gallary`);
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}
