import { MetaFunction, LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData, useLocation, useNavigate } from "@remix-run/react";
import { AuthorizedLayout } from "~/components/AuthorizedLayout/AuthorizedLayout";
import { ProductInterface } from "~/components/Product/Interfaces/ProductInterface";
import { ProductCard } from "~/components/Product/ProductCard/ProductCard";
import { ProductService } from "~/services/api";
import { useCart } from "~/contexts/CartContext";

export const meta: MetaFunction = () => {
  return [
    { title: "Corzhify - Products" },
    { name: "description", content: "Corzhify - Products" },
  ];
};

export const loader = async (loaderArguments: LoaderFunctionArgs) => {
  try {
    const products = await ProductService.getAll();
    return { products };
  } catch (error) {
    console.error("Failed to load products:", error);
    throw new Response("Failed to load products", { status: 500 });
  }
};
export default function OverviewPage() {
  const { products } = useLoaderData<typeof loader>();
  const location = useLocation();
  const navigate = useNavigate();
  const { getCartItemCount } = useCart();

  return (
    <AuthorizedLayout.Page
      activePage={location.pathname}
      backButton={{ onClick: () => navigate(-1) }}
      cartAmount={getCartItemCount()}
    >
      <div>
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => {
            return (
              <ProductCard
                key={product.id}
                product={{
                  id: product.id,
                  title: product.title,
                  image: product.image,
                  href: `/products/${product.id}`,
                  price: product.price,
                }}
              />
            );
          })}
        </ul>
      </div>
    </AuthorizedLayout.Page>
  );
}
