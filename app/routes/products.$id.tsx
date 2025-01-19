import { useLoaderData } from "@remix-run/react";
import { LoaderFunction } from "@remix-run/node";
import { AuthorizedLayout } from "~/components/AuthorizedLayout/AuthorizedLayout";
import { ProductInterface } from "./products._index";
import { ProductOverviewRow } from "~/components/ProductOverview/ProductOverviewRow/ProductOverviewRow";

export const loader: LoaderFunction = async ({ params }) => {
  console.log("params --->", params);

  const productId = params.id; // Access the dynamic param from the URL
  const product = await fetch(
    `https://fakestoreapi.com/products/${productId}`
  ).then((res) => res.json());

  if (!product) {
    throw new Response("Product Not Found", { status: 404 });
  }

  return product;
};

export default function ProductDetail() {
  const product: ProductInterface = useLoaderData();
  console.log("product ===>", product);

  return (
    <AuthorizedLayout.Page>
      <div className="grid grid-cols-2 gap-4 bg-white border rounded border-gray-200">
        <div className="w-full h-460 flex items-center justify-center mb-4 p-2">
          <img
            src={product.image}
            alt={product.title}
            className="h-full object-contain"
          />
        </div>
        <div className="border-l">
          <ul className="divide-y divide-gray-100">
            <ProductOverviewRow
              label="Name"
              description={product.title}
              background="bg-gray-50"
            />
            <ProductOverviewRow
              label="Category"
              description={product.category}
            />
            <ProductOverviewRow
              label="Price"
              description={product.category}
              background="bg-gray-50"
            />
            <ProductOverviewRow
              label="Available"
              description={product.rating.count}
            />
            <ProductOverviewRow
              label="Product rating"
              description={product.rating.rate}
              background="bg-gray-50"
            />
            <ProductOverviewRow
              label="Description"
              description={product.description}
            />
          </ul>
        </div>
      </div>
    </AuthorizedLayout.Page>
  );
}
