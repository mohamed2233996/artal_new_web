import { API_ENDPOINT } from "@/shared/constants";
import { HomeData } from "@/types/home";

export async function getHome(): Promise<HomeData|undefined> {
  const res = await fetch(`${API_ENDPOINT}/home`);
  if (!res.ok) {
    return;
  }
  return res.json();
}
