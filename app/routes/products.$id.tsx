import { useLoaderData, useLocation, useNavigate } from "@remix-run/react";
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
  const product: ProductInterface = await fetch(
    `https://fakestoreapi.com/products/${productId}`
  ).then((res) => res.json());
  const carts = await fetch("https://fakestoreapi.com/carts/user/2").then(
    (res) => res.json()
  );

  if (!product) {
    throw new Response("Product Not Found", { status: 404 });
  }

  return { product, carts };
};

export default function ProductDetail() {
  const { product, carts } = useLoaderData<typeof loader>();
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <AuthorizedLayout.Page
      activePage={location.pathname}
      backButton={{ onClick: () => navigate(-1) }}
      cartAmount={carts[0].products.length}
    >
      <ProductOverview product={product} />
    </AuthorizedLayout.Page>
  );
}
