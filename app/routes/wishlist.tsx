import { MetaFunction } from "@remix-run/node";
import {
  useLoaderData,
  useLocation,
  useNavigate,
  Link,
} from "@remix-run/react";
import { AuthorizedLayout } from "~/components/AuthorizedLayout/AuthorizedLayout";
import { ProductCard } from "~/components/Product/ProductCard/ProductCard";
import { ProductService } from "~/services/api";
import { useCart } from "~/contexts/CartContext";
import { useWishlist } from "~/contexts/WishlistContext";
import { Icon } from "~/components/Icon/Icon";

export const meta: MetaFunction = () => {
  return [
    { title: "Corzhify - Wishlist" },
    { name: "description", content: "Your favorite products" },
  ];
};

export const loader = async () => {
  try {
    const products = await ProductService.getAll();
    return { products };
  } catch (error) {
    console.error("Failed to load products:", error);
    throw new Response("Failed to load products", { status: 500 });
  }
};

export default function WishlistPage() {
  const { products } = useLoaderData<typeof loader>();
  const location = useLocation();
  const navigate = useNavigate();
  const { getCartItemCount } = useCart();
  const { wishlist } = useWishlist();

  const wishlistProducts = products.filter((product) =>
    wishlist.includes(product.id)
  );

  return (
    <AuthorizedLayout.Page
      activePage={location.pathname}
      backButton={{ onClick: () => navigate(-1) }}
      cartAmount={getCartItemCount()}
    >
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-slate-800 dark:text-gray-100 mb-6">
          My Wishlist
        </h1>

        {wishlistProducts.length === 0 ? (
          <div className="text-center py-16 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
            <Icon.Heart className="w-16 h-16 mx-auto text-gray-300 dark:text-gray-600 mb-4" />
            <h2 className="text-xl font-semibold text-slate-700 dark:text-gray-300 mb-2">
              Your wishlist is empty
            </h2>
            <p className="text-slate-500 dark:text-gray-400 mb-6 px-5">
              Start adding products you love!
            </p>
            <Link
              to="/products"
              className="inline-block px-6 py-3 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors font-medium"
            >
              Browse Products
            </Link>
          </div>
        ) : (
          <>
            <p className="text-slate-600 dark:text-gray-400 mb-4">
              {wishlistProducts.length} item
              {wishlistProducts.length !== 1 ? "s" : ""} in your wishlist
            </p>
            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {wishlistProducts.map((product) => (
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
            </ul>
          </>
        )}
      </div>
    </AuthorizedLayout.Page>
  );
}
