import { API_ENDPOINT } from "@/shared/constants";
import { unstable_noStore } from "next/cache";

export type Contacts = {
  address_en: string;
  address_ar: string;
  phone: string;
  email: string;
  openTimeFrom: string;
  openTimeTo: string;
  facebook: string;
  twitter: string;
  instagram: string;
  youtube: string;
};

export async function getContacts(): Promise<Contacts | undefined> {
  unstable_noStore()
  const res = await fetch(`${API_ENDPOINT}/contacts`);
  if (!res.ok) {
    return;
  }
  return res.json();
}
