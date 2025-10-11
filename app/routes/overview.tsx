import { MetaFunction } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { AuthorizedLayout } from "~/components/AuthorizedLayout/AuthorizedLayout";
import { ProductCard } from "~/components/Product/ProductCard/ProductCard";
import { ProductService } from "~/services/api";
import { useCart } from "~/contexts/CartContext";

export const meta: MetaFunction = () => {
  return [
    { title: "Corzhify - Overview" },
    { name: "description", content: "Corzhify - Overview" },
  ];
};

export const loader = async () => {
  try {
    const products = await ProductService.getAll();
    return { products };
  } catch (error) {
    console.error("Failed to load overview data:", error);
    throw new Response("Failed to load data", { status: 500 });
  }
};
export default function OverviewPage() {
  const { products } = useLoaderData<typeof loader>();
  const { getCartItemCount } = useCart();

  return (
    <AuthorizedLayout.Page
      activePage={""}
      cartAmount={getCartItemCount()}
    >
      <section>
        <div className="bg-gradient-to-r from-primary-200 via-orange-200 to-secondary-200 py-12 mb-8 rounded-2xl shadow-lg text-center">
          <h1 className="text-2xl md:text-5xl font-bold bg-gradient-to-r from-primary-700 to-secondary-600 bg-clip-text text-transparent">
            Welcome to Corzhify
          </h1>
          <p className="mt-4 text-base md:text-xl text-slate-700 max-w-2xl mx-auto px-4">
            Find the best products at unbeatable prices!
          </p>
          <h2 className="text-xl md:text-3xl font-semibold mt-6 text-slate-800">
            ✨ Trending Products
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-slate-600">
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
        <div className="flex flex-wrap items-center justify-center gap-4 mt-8 text-center">
          <Link
            to="/products"
            className="px-6 py-3 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors font-medium shadow-sm"
          >
            View All Products
          </Link>
          <span className="text-slate-500">or</span>
          <Link
            to="/categories"
            className="px-6 py-3 border border-primary-500 text-primary-600 rounded-lg hover:bg-primary-50 transition-colors font-medium"
          >
            Browse Categories
          </Link>
        </div>
      </section>
    </AuthorizedLayout.Page>
  );
}
