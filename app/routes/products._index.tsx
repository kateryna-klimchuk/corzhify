import { MetaFunction, LoaderFunctionArgs, json } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
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
  const products = await fetch("https://fakestoreapi.com/products").then(
    (res) => res.json()
  );
  return json(products);
};
export default function OverviewPage() {
  const products: ProductInterface[] = useLoaderData<typeof loader>();

  return (
    <AuthorizedLayout.Page>
      <div>
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product, index) => {
            return (
              <ProductCard
                key={index}
                product={{
                  id: product.id,
                  title: product.title,
                  image: product.image,
                  href: `/products/${product.id}`,
                }}
              />
            );
          })}
        </ul>
      </div>
    </AuthorizedLayout.Page>
  );
}
