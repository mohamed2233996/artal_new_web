import { API_ENDPOINT } from "@/shared/constants";

export type Service = {
  _id: string;
  title_ar: string;
  title_en: string;
  desc_ar: string;
  desc_en: string;
  bigImage: string;
};

/**
 * @description fetch services info from apis.
 */
export async function getServices(): Promise<Service[] | undefined> {
  const res = await fetch(`${API_ENDPOINT}/services`);
  if (!res.ok) {
    return;
  }
  return res.json();
}
