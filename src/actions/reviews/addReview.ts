import { API_ENDPOINT } from "@/shared/constants";
import { ReviewRequest } from "@/types";

export default async function addReview(
  productId: string,
  token: string,
  body: ReviewRequest
) {
  const response = await fetch(
    `${API_ENDPOINT}/reviews/product/${productId}/`,
    {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );
  return await response.json();
}
