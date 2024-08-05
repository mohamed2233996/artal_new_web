import { API_ENDPOINT } from "@/shared/constants";
import { unstable_noStore } from "next/cache";

export type PageInfoReturn = {
  image: string;
  title_ar: string;
  title_en: string;
  desc_ar: string;
  desc_en: string;
};

/**
 * @description fetch (about, privacy, terms of condiations) page info from apis.
 */
export async function getPageInfo(endpoint: number): Promise<PageInfoReturn> {
  unstable_noStore()
  const res = await fetch(`${API_ENDPOINT}/page/${endpoint}`);
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}
