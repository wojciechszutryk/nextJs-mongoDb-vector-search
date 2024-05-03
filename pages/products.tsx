import clientPromise from "../lib/mongodb";
import { GetServerSideProps } from "next";

interface Product {
  _id: string;
  product_name: string;
}

interface Props {
  products: Product[];
}

const Products: React.FC<Props> = ({ products }) => {
  console.log("products in Products", products);

  return (
    <div>
      <h1>Top 10 Products of All Time</h1>
      <p>
        <small>(According to me)</small>
      </p>
      <ul>
        {products.map((product) => (
          <li key={product._id}>
            <h2>{product.product_name}</h2>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Products;

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const client = await clientPromise;
    const db = client.db("next-mongo-vector-search");
    const products = await db
      .collection("products")
      .find({})
      .limit(10)
      .toArray();
    console.log("products in getServerSideProps", products);

    return {
      props: { products: JSON.parse(JSON.stringify(products)) },
    };
  } catch (e) {
    console.error(e);
    return { props: { products: [] } };
  }
};
