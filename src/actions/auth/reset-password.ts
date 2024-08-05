import { API_ENDPOINT } from "@/shared/constants";

export async function requestPasswordReset(email: string) {
  const res = await fetch(`${API_ENDPOINT}/auth/reset-password`, {
    method: "PATCH",
    body: JSON.stringify({ email }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!res.ok) {
    return;
  }
  return res.json();
}
