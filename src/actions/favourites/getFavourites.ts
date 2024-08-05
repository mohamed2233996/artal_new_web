import { API_ENDPOINT } from "@/shared/constants";

export async function getFavourites(token: string): Promise<any[] | undefined> {
  const res = await fetch(`${API_ENDPOINT}/favourites`, {
    method: "GET",
    headers: {
      authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    return;
  }
  return res.json();
}
