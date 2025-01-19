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
  const products = await fetch("https://fakestoreapi.com/products").then(
    (res) => res.json()
  );
  return json(products);
};
export default function OverviewPage() {
  const products: any = useLoaderData<typeof loader>();

  console.log("data", products);

  return (
    <AuthorizedLayout.Page>
      <div>
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map(
            (
              product: {
                id: number;
                title: string | undefined;
                image: string | undefined;
              },
              index: Key
            ) => {
              console.log("product ==>", product);

              return (
                <li
                  key={index}
                  className="border rounded border-gray-300 p-4 flex flex-col items-center"
                >
                  <Link
                    to={`/products/${product.id}`}
                    className="block w-full text-center"
                  >
                    <div className="w-full h-40 flex items-center justify-center mb-4">
                      <img
                        src={product.image}
                        alt={product.title}
                        className="h-full object-contain"
                      />
                    </div>
                    <h3 className="text-lg font-semibold pb-4">
                      {product.title}
                    </h3>
                  </Link>
                </li>
              );
            }
          )}
        </ul>
      </div>
    </AuthorizedLayout.Page>
  );
}
