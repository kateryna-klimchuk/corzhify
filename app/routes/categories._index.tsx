import { MetaFunction, LoaderFunctionArgs, json } from "@remix-run/node";
import { Link, useLoaderData, useLocation } from "@remix-run/react";

import { AuthorizedLayout } from "~/components/AuthorizedLayout/AuthorizedLayout";
import { ProductCard } from "~/components/Product/ProductCard/ProductCard";
export const meta: MetaFunction = () => {
  return [
    { title: "Corzhify - Categories" },
    { name: "description", content: "Corzhify - Categories" },
  ];
};

export const loader = async (loaderArguments: LoaderFunctionArgs) => {
  const categories = await fetch(
    "https://fakestoreapi.com/products/categories"
  ).then((res) => res.json());
  console.log("categories ===>", await categories);

  return json(categories);
};
export default function OverviewPage() {
  const categories: string[] = useLoaderData<typeof loader>();

  const location = useLocation();

  return (
    <AuthorizedLayout.Page activePage={location.pathname}>
      <div>
        <h1>Welcome to the Corzhify Categories</h1>
        <p>
          Discover the best products, latest trends, and everything Corzhify has
          to offer. Start browsing!
        </p>
        <div>
          <h2>Choose a category</h2>
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category, index) => {
              return (
                <ProductCard
                  key={index}
                  product={{
                    id: category,
                    title: category,
                    image: undefined,
                    href: `/categories/${category}`,
                  }}
                />
              );
            })}
          </ul>
        </div>
      </div>
    </AuthorizedLayout.Page>
  );
}
