import { getProducts } from "@/actions/getProducts";
import ProductPage from "./productPage";
import { getReviews } from "@/actions/getReviews";
import { getInstagramImages } from "@/actions/getInstagramImages";

export default async function ProductWrapper({
  params,
}: {
  params: { id: string };
}) {
  const reviews = await getReviews(params?.id);
  const products = await getProducts();
  const instagram = await getInstagramImages();

  const product = products.find((p) => p.id === params?.id);

  return (
    <ProductPage
      reviews={reviews!}
      products={products}
      product={product}
      instagramImages={instagram}
    />
  );
}
