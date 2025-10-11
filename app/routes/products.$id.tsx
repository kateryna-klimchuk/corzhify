import { useLoaderData, useLocation, useNavigate } from "@remix-run/react";
import { LoaderFunction, MetaFunction } from "@remix-run/node";
import { AuthorizedLayout } from "~/components/AuthorizedLayout/AuthorizedLayout";
import { ProductInterface } from "~/components/Product/Interfaces/ProductInterface";
import { ProductOverview } from "~/components/Product/ProductOverview/ProductOverview";
import { useCart } from "~/contexts/CartContext";

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

  if (!product) {
    throw new Response("Product Not Found", { status: 404 });
  }

  return { product };
};

export default function ProductDetail() {
  const { product } = useLoaderData<typeof loader>();
  const location = useLocation();
  const navigate = useNavigate();
  const { getCartItemCount } = useCart();

  return (
    <AuthorizedLayout.Page
      activePage={location.pathname}
      backButton={{ onClick: () => navigate(-1) }}
      cartAmount={getCartItemCount()}
    >
      <ProductOverview product={product} />
    </AuthorizedLayout.Page>
  );
}
