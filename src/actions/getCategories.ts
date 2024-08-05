import { API_ENDPOINT } from "@/shared/constants";
import { Category } from "@/types/Product";
import { unstable_noStore } from "next/cache";

export async function getCategories(): Promise<Category[] | undefined> {
  unstable_noStore()
  const res = await fetch(`${API_ENDPOINT}/category`);
  if (!res.ok) {
    return;
  }
  return res.json();
}
