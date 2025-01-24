import { MetaFunction } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { AuthorizedLayout } from "~/components/AuthorizedLayout/AuthorizedLayout";
import { ProductInterface } from "~/components/Product/Interfaces/ProductInterface";
import { ProductCard } from "~/components/Product/ProductCard/ProductCard";
export const meta: MetaFunction = () => {
  return [
    { title: "Corzhify - Overview" },
    { name: "description", content: "Corzhify - Overview" },
  ];
};

export const loader = async () => {
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

  return (
    <AuthorizedLayout.Page
      activePage={""}
      cartAmount={carts[0].products.length}
    >
      <section className="text-center">
        <div className="bg-gradient-to-r from-orange-200 to-pink-200 py-4 mb-6">
          <h1 className="text-4xl font-bold">Welcome to Corzhify</h1>
          <p className="mt-4 text-lg">
            Find the best products at unbeatable prices!
          </p>
          <h2 className="text-2xl font-semibold">Trending Products</h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-slate-600">
          {products.map((product) => (
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
          ))}
        </div>
        <div className="flex items-end justify-center gap-4 text-orange-400">
          <Link to="/products" className="block mt-4 text-center">
            View All Products
          </Link>
          <p className="text-slate-600">or</p>
          <Link to="/categories" className="block mt-4 text-center">
            View All Categories
          </Link>
        </div>
      </section>
    </AuthorizedLayout.Page>
  );
}
