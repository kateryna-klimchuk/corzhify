import { useLoaderData, useLocation } from "@remix-run/react";
import { LoaderFunction, MetaFunction } from "@remix-run/node";
import { AuthorizedLayout } from "~/components/AuthorizedLayout/AuthorizedLayout";
import { ProductInterface } from "~/components/Product/Interfaces/ProductInterface";
import { ProductOverview } from "~/components/Product/ProductOverview/ProductOverview";

export const meta: MetaFunction = () => {
  return [
    { title: "Corzhify - Product" },
    { name: "description", content: "Corzhify - Product" },
  ];
};
export const loader: LoaderFunction = async ({ params }) => {
  const productId = params.id;
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
  const location = useLocation();

  return (
    <AuthorizedLayout.Page activePage={location.pathname}>
      <ProductOverview product={product} />
    </AuthorizedLayout.Page>
  );
}
