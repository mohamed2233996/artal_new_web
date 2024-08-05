import { API_ENDPOINT } from "@/shared/constants";

export type ServiceCTE = {
  id: number;
  title_ar: string;
  title_en: string;
};

/**
 * @description fetch services info from apis.
 */
export async function getServicesCTE(): Promise<ServiceCTE[] | undefined> {
  const res = await fetch(`${API_ENDPOINT}/services/cte`);
  if (!res.ok) {
    return;
  }
  return res.json();
}
