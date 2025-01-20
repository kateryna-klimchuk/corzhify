import { Link, MetaFunction, useLoaderData } from "@remix-run/react";
import { ProductInterface } from "../components/Product/Interfaces/ProductInterface";
import { AuthorizedLayout } from "../components/AuthorizedLayout/AuthorizedLayout";
import { LoaderFunctionArgs } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [
    { title: "Corzhify - Category products" },
    { name: "description", content: "Corzhify - Category products" },
  ];
};
export const loader = async ({ params }: LoaderFunctionArgs) => {
  console.log("params", params);

  const category = params.category;
  const categoryProducts = await fetch(
    `https://fakestoreapi.com/products/category/${category}`
  ).then((res) => res.json());

  if (!categoryProducts) {
    throw new Response("Products Not Found", { status: 404 });
  }
  return categoryProducts;
};

export default function CategoryPage() {
  const categoryProducts: ProductInterface[] = useLoaderData();

  return (
    <AuthorizedLayout.Page>
      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {categoryProducts.map((product, index) => {
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
                <h3 className="text-lg font-semibold">{product.title}</h3>
              </Link>
            </li>
          );
        })}
      </ul>
    </AuthorizedLayout.Page>
  );
}
