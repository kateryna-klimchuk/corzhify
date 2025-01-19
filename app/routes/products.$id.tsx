import { useLoaderData } from "@remix-run/react";
import { json, LoaderFunction } from "@remix-run/node";

export const loader: LoaderFunction = async ({ params }) => {
  console.log("params --->", params);

  const productId = params.id; // Access the dynamic param from the URL
  const product = await fetch(
    `https://fakestoreapi.com/products/${productId}`
  ).then((res) => res.json());
  console.log("product ===>", product);

  if (!product) {
    throw new Response("Product Not Found", { status: 404 });
  }

  return json(product); // Return the product data to the component
};

export default function ProductDetail() {
  const product = useLoaderData(); // Access the product data returned by the loader

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">{product.title}</h1>
      <p className="mt-4">{product.description}</p>
    </div>
  );
}
