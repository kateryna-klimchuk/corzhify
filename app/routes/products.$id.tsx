import { useLoaderData, useLocation, useNavigate } from "@remix-run/react";
import { LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import { AuthorizedLayout } from "~/components/AuthorizedLayout/AuthorizedLayout";
import { ProductOverview } from "~/components/Product/ProductOverview/ProductOverview";
import { useCart } from "~/contexts/CartContext";
import { ProductService } from "~/services/api";

export const meta: MetaFunction = () => {
  return [
    { title: "Corzhify - Product" },
    { name: "description", content: "Corzhify - Product" },
  ];
};
export const loader = async ({ params }: LoaderFunctionArgs) => {
  const productId = params.id;
  if (!productId) {
    throw new Response("Product ID not specified", { status: 400 });
  }
  try {
    const product = await ProductService.getById(productId);
    return { product };
  } catch (error) {
    console.error("Failed to load product:", error);
    throw new Response("Product Not Found", { status: 404 });
  }
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
