import { getHome } from "@/actions/getHome";
import Home from "./components/home";
import { getProducts } from "@/actions/getProducts";

export default async function Page() {
  const data = await getHome();
  const products = await getProducts();

  return (
    <Home data={data!} products={products} />
  );
}
