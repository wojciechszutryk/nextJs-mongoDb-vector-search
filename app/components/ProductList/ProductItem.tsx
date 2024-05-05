import { Product } from "@/shared/types/product.interface";
import { memo } from "react";

const ProductItem = ({
  product_name,
  manufacturer,
  price,
  average_review_rating,
}: Product): JSX.Element => {
  return (
    <li className="bg-white rounded-lg shadow-md p-4 mb-4">
      <h2 className="text-xl font-semibold mb-2">{product_name}</h2>
      <p className="text-gray-600 mb-2">Manufacturer: {manufacturer}</p>
      <p className="text-gray-600 mb-2">Price: {price}</p>
      <p className="text-gray-600">
        Average Review Rating: {average_review_rating}
      </p>
    </li>
  );
};

export default memo(ProductItem);
