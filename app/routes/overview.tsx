import { MetaFunction, LoaderFunctionArgs, json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

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
  const data = useLoaderData<typeof loader>();

  console.log("data", data);

  return (
    <AuthorizedLayout.Page>
      <div>
        <h1>Welcome to the Corzhify Overview</h1>
        <p>
          Discover the best products, latest trends, and everything Corzhify has
          to offer. Start browsing!
        </p>
      </div>
    </AuthorizedLayout.Page>
  );
}
