import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import clientPromise from "../../../lib/mongodb";
import {
  DB_NAME,
  PRODUCTS_COLLECTION_NAME,
  PRODUCTS_EMBEDDING_PATH,
  PRODUCTS_INDEX_NAME,
} from "@/shared/consts/db.const";
import { SEARCH_QUERY_PARAM } from "@/shared/consts/search.const";

export async function GET(request: NextRequest) {
  try {
    const query = request.nextUrl.searchParams.get(SEARCH_QUERY_PARAM);

    const client = await clientPromise;

    if (!query) {
      const db = client.db(DB_NAME);
      const products = await db
        .collection(PRODUCTS_COLLECTION_NAME)
        .find({})
        .limit(10)
        .toArray();
      return new NextResponse(JSON.stringify(products));
    }

    // Call OpenAI API to get the embeddings.
    const url = "https://api.openai.com/v1/embeddings";
    const openai_key = process.env.Open_ai;
    let embedding = null;

    let response = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${openai_key}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        input: query,
        model: "text-embedding-ada-002",
      }),
    });
    const respData = await response.json();

    if (response.status === 200) {
      embedding = respData.data[0].embedding;
    } else {
      throw new Error(
        `Failed to get embedding. Status code: ${response.status}`
      );
    }

    const db = client.db(DB_NAME);
    const products = await db
      .collection(PRODUCTS_COLLECTION_NAME)
      .aggregate([
        {
          $vectorSearch: {
            index: PRODUCTS_INDEX_NAME,
            path: PRODUCTS_EMBEDDING_PATH,
            queryVector: embedding,
            numCandidates: 100,
            limit: 10,
          },
        },
      ])
      .toArray();
    return new NextResponse(JSON.stringify(products));
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
    const db = client.db(DB_NAME);

    const validationResult = ProductSchema.safeParse(dataObj);

    if (!validationResult.success) {
      throw new Error(validationResult.error.errors[0].message);
    }

    const product = await db
      .collection(PRODUCTS_COLLECTION_NAME)
      .insertOne(dataObj);

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
