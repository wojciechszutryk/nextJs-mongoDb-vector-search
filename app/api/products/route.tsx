import { NextResponse } from "next/server";
import { z } from "zod";
import clientPromise from "../../../lib/mongodb";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("next-mongo-vector-search");
    const movies = await db.collection("products").find({}).limit(10).toArray();
    return new NextResponse(JSON.stringify(movies));
  } catch (e) {
    console.error(e);
  }
}

const ProductSchema = z.object({
  product_name: z.string().min(1),
  manufacturer: z.string().optional(),
  price: z.string().min(1),
  average_review_rating: z.string().optional(),
});

export async function POST(req: Request) {
  try {
    const [data, client] = await Promise.all([req.formData(), clientPromise]);
    const dataObj = Object.fromEntries(data);
    console.log("data", dataObj);
    const db = client.db("next-mongo-vector-search");

    const validationResult = ProductSchema.safeParse(dataObj);

    if (!validationResult.success) {
      throw new Error(validationResult.error.errors[0].message);
    }

    const product = await db.collection("products").insertOne(dataObj);

    return new NextResponse(
      JSON.stringify({ id: product.insertedId.toString() })
    );
  } catch (e) {
    if (e instanceof Error) {
      return new NextResponse(e.message, { status: 400 });
    }
    return new NextResponse("An error occurred", { status: 500 });
  }
}
