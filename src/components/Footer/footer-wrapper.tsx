import { API_ENDPOINT } from "@/shared/constants";
import Footer from ".";

async function getContacts() {
  const res = await fetch(`${API_ENDPOINT}/contacts`);

  if (!res.ok) {
    return;
  }

  return res.json();
}

export default async function FooterWrapper() {
  const data = await getContacts();

  return <Footer data={data} />;
}
