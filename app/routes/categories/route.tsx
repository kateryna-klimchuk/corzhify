import { MetaFunction, LoaderFunctionArgs, json } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import {
  ReactElement,
  JSXElementConstructor,
  ReactNode,
  ReactPortal,
  Key,
} from "react";

import { AuthorizedLayout } from "~/components/AuthorizedLayout/AuthorizedLayout";
export const meta: MetaFunction = () => {
  return [
    { title: "Corzhify - Overview" },
    { name: "description", content: "Corzhify - Overview" },
  ];
};

export const loader = async (loaderArguments: LoaderFunctionArgs) => {
  const categories = await fetch(
    "https://fakestoreapi.com/products/categories"
  ).then((res) => res.json());
  console.log("categories ===>", await categories);
  console.log("loaderArguments", loaderArguments);

  return json(categories);
};
export default function OverviewPage() {
  const categories: string[] = useLoaderData<typeof loader>();

  console.log("data", categories);

  return (
    <AuthorizedLayout.Page>
      <div>
        <h1>Welcome to the Corzhify Categories</h1>
        <p>
          Discover the best products, latest trends, and everything Corzhify has
          to offer. Start browsing!
        </p>
        <div>
          <h2>Featured Products</h2>
          <ul>
            {categories.map((category, index) => {
              console.log("category", category);

              return (
                <li key={index}>
                  <Link to={"/products"}>{category}</Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </AuthorizedLayout.Page>
  );
}
