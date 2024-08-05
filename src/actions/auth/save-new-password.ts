import { API_ENDPOINT } from "@/shared/constants";
import toast from "react-hot-toast";

export async function SaveNewPassword(
  token: string, password: string
): Promise<any[] | undefined> {
  const res = await fetch(`${API_ENDPOINT}/auth/reset-password`, {
    method: "POST",
    body: JSON.stringify({ token, password }),
    headers: {
      "Content-Type": "application/json",
    },
  })

  return res.json();
}
