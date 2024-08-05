import { getHome } from "@/actions/getHome";
import Home from "./components/home";
import { getProducts } from "@/actions/getProducts";
import { getCategories } from "@/actions/getCategories";

export default async function Page() {
  const data = await getHome();
  const products = await getProducts();
  const categories = await getCategories();

  return (
    <Home data={data!} products={products} categories={categories!} />
  );
}
