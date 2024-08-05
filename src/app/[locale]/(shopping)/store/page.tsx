import { getProducts } from "@/actions/getProducts";
import Store from "./store";
import { getCategories } from "@/actions/getCategories";
import { getFilterPrices } from "@/actions/getFilters";
import { getInstagramImages } from "@/actions/getInstagramImages";
import { Metadata } from "next";

export const metadata: Metadata = {
  keywords: [
    "Oud perfumes (عطور العود)",
    "Bakhoor (بخور)",
    "Attar (عطر)",
    "Eau de Parfum (EDP) (او دى بارفان)",
    "Eau de Toilette (EDT) (او دى تواليت)",
    "Perfume oils (زيوت عطور)",
    "Oriental perfumes (عطور شرقي)",
    "Fragrance gift sets (علب هدايا عطور)",
    "Perfume samplers (عينات عطر)",
    "Long-lasting perfumes (عطور ثابته)",
  ],
};

export default async function StoreWrapper() {
  const categories = await getCategories();
  const products = await getProducts();
  const filters = await getFilterPrices();
  const images = await getInstagramImages();

  return (
    <Store
      categories={categories!}
      products={products}
      filters={filters}
      images={images}
    />
  );
}
