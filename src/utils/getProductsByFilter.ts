import { Product } from "@/types/Product";

const filterProductsByCategory = (
  products: Product[],
  categoryId?: string
): Product[] =>
  categoryId && categoryId !== 'all' ? products.filter((p) => p.category.id === categoryId) : products;

const filterProductsByPriceRange = (
  products: Product[],
  minPrice?: number,
  maxPrice?: number
): Product[] =>
  products.filter(
    (p) =>
      (minPrice === undefined || p.price >= minPrice) &&
      (maxPrice === undefined || p.price <= maxPrice)
  );

const sortByPrice = (products: Product[], sortBy: string | undefined): Product[] => {
  const sortedData = [...products].sort((a, b) => {
    switch (sortBy) {
      case "az":
        return a.name_en.localeCompare(b.name_en);
      case "za":
        return -a.name_en.localeCompare(b.name_en);
      case "lth":
        return a.price - b.price;
      case "htl":
        return b.price - a.price;
      default:
        return 0;
    }
  });
  return sortedData;
};

export const getProductsByFilter = (
  products: Product[],
  options?: {
    categoryId?: string;
    minPrice?: number;
    maxPrice?: number;
    sortBy?: string;
  }
) => {
  const filteredProducts = filterProductsByCategory(
    products,
    options?.categoryId
  );
  const priceFilteredProducts = filterProductsByPriceRange(
    filteredProducts,
    options?.minPrice,
    options?.maxPrice
  );
  return sortByPrice(priceFilteredProducts, options?.sortBy);
};
