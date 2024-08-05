import toast from "react-hot-toast";
import { API_ENDPOINT } from "@/shared/constants";

export default async function removeFromCartAction(
  cartId: string,
  productId: string,
  token: string
) {
  const response = await fetch(
    `${API_ENDPOINT}/cart/${cartId}/product/${productId}`,
    {
      method: "DELETE",
      headers: {
        authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );

  if (!response.ok) {
    toast.error("something went wrong");
  }

  return await response.json();
}
