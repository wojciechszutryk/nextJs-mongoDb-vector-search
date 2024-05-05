"use client";
import { Product } from "@/shared/types/product.interface";
import { useEffect, useState } from "react";
import Input from "../Input";
import Button from "../Button";
import ProductItem from "./ProductItem";
import NewProductDialog from "./NewProductDialog";
import ProductsSkeleton from "./ProductsSkeleton";

interface Props {
  search: (search: string) => Promise<Product[]>;
}

const ProductList = ({ search }: Props): JSX.Element => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchPhrase, setSearchPhrase] = useState("");

  useEffect(() => {
    setIsLoading(true);
    search("").then((resp) => setProducts(resp));
    setIsLoading(false);
  }, [search]);

  const onSearch = async () => {
    setIsLoading(true);
    const results = await search(searchPhrase);
    setProducts(results);
    setIsLoading(false);
  };

  return (
    <>
      <div className="flex gap-2 flex-col justify-center flex-wrap w-full py-5 sm:flex-row sm:justify-between">
        <div className="flex gap-2">
          <Input
            placeholder="Search for products"
            value={searchPhrase}
            onChange={(e) => setSearchPhrase(e.target.value)}
          />
          <Button onClick={onSearch}>Search</Button>
        </div>
        <NewProductDialog />
      </div>

      {isLoading ? (
        <ProductsSkeleton />
      ) : (
        <ul>
          {products.map((p) => (
            <ProductItem {...p} key={p._id} />
          ))}
        </ul>
      )}
    </>
  );
};

export default ProductList;
