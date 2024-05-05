import { Product } from "../shared/types/product.interface";
import ProductList from "./components/ProductList";
import { SEARCH_QUERY_PARAM } from "@/shared/consts/search.const";

interface Props {
  products: Product[];
}

const Products: React.FC<Props> = () => {
  const getProducts = async (phrase: string): Promise<Product[]> => {
    "use server";
    try {
      const queryParams = new URLSearchParams();
      queryParams.append(SEARCH_QUERY_PARAM, phrase);

      const url = new URL(`${process.env.APP_URL}/api/products`);
      url.search = queryParams.toString();

      const response = await fetch(url).then((res) => res.json());

      return response;
    } catch (e) {
      console.error(e);
      return [];
    }
  };

  return (
    <main>
      <h1 className="text-4xl font-bold text-center mb-8">
        Mongo.db + Next.js Semantic Vector Search Demo
      </h1>
      <ProductList search={getProducts} />
    </main>
  );
};

export default Products;
