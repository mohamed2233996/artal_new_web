import { Product } from "@/types/Product";

//get product by id
export const getProductById = (products: Product[], id: string) => {
  return products.find((product) => product.id === id);
};
