import { MetaFunction, LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData, useLocation, useNavigate } from "@remix-run/react";
import { AuthorizedLayout } from "~/components/AuthorizedLayout/AuthorizedLayout";
import { ProductInterface } from "~/components/Product/Interfaces/ProductInterface";
import { ProductCard } from "~/components/Product/ProductCard/ProductCard";
export const meta: MetaFunction = () => {
  return [
    { title: "Corzhify - Products" },
    { name: "description", content: "Corzhify - Products" },
  ];
};

export const loader = async (loaderArguments: LoaderFunctionArgs) => {
  const products: ProductInterface[] = await fetch(
    "https://fakestoreapi.com/products"
  ).then((res) => res.json());
  const carts = await fetch("https://fakestoreapi.com/carts/user/2").then(
    (res) => res.json()
  );
  return { products, carts };
};
export default function OverviewPage() {
  const { products, carts } = useLoaderData<typeof loader>();
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <AuthorizedLayout.Page
      activePage={location.pathname}
      backButton={{ onClick: () => navigate(-1) }}
      cartAmount={carts[0].products.length}
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
