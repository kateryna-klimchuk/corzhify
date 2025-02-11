import { MetaFunction, LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData, useLocation, useNavigate } from "@remix-run/react";

import { AuthorizedLayout } from "~/components/AuthorizedLayout/AuthorizedLayout";
import { ProductCard } from "~/components/Product/ProductCard/ProductCard";
import { TextUtility } from "~/components/Utilities/TextUtility";
export const meta: MetaFunction = () => {
  return [
    { title: "Corzhify - Categories" },
    { name: "description", content: "Corzhify - Categories" },
  ];
};

export const loader = async (loaderArguments: LoaderFunctionArgs) => {
  const categories: string[] = await fetch(
    "https://fakestoreapi.com/products/categories"
  ).then((res) => res.json());
  const carts = await fetch("https://fakestoreapi.com/carts/user/2").then(
    (res) => res.json()
  );
  return { categories, carts };
};
export default function OverviewPage() {
  const { categories, carts } = useLoaderData<typeof loader>();

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
          {categories.map((category, index) => {
            return (
              <ProductCard
                key={index}
                product={{
                  id: category,
                  title: TextUtility.capitalized(category),
                  image: undefined,
                  href: `/categories/${category}`,
                }}
              />
            );
          })}
        </ul>
      </div>
    </AuthorizedLayout.Page>
  );
}
