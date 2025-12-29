import { Link } from "@remix-run/react";
import { useState } from "react";
import { Icon } from "~/components/Icon/Icon";
import { useWishlist } from "~/contexts/WishlistContext";
import { useToast } from "~/contexts/ToastContext";

interface ProductCardInterface {
  product: {
    id: string | number;
    title: string;
    image?: string;
    href: string;
    price?: number;
  };
}
export const ProductCard: React.FunctionComponent<ProductCardInterface> = ({
  product,
}) => {
  const [imageError, setImageError] = useState(false);
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { showToast } = useToast();

  const productId = typeof product.id === "string" ? parseInt(product.id, 10) : product.id;
  const isWishlisted = isInWishlist(productId);

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(productId);
    if (isWishlisted) {
      showToast(`Removed "${product.title}" from wishlist`, "info");
    } else {
      showToast(`Added "${product.title}" to wishlist`, "success");
    }
  };

  return (
    <li className="group relative flex flex-col items-center border rounded-lg border-gray-200 p-4 bg-white dark:bg-gray-800 dark:border-gray-700 hover:shadow-card-hover hover:border-primary-300 dark:hover:border-primary-500 transition-all duration-300">
      <button
        onClick={handleWishlistClick}
        className="absolute top-3 right-3 z-10 p-2 rounded-full bg-white/80 dark:bg-gray-700/80 hover:bg-white dark:hover:bg-gray-700 shadow-sm transition-all"
        aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
      >
        <Icon.Heart
          className={`w-5 h-5 transition-colors ${
            isWishlisted ? "text-secondary-500" : "text-gray-400 hover:text-secondary-400"
          }`}
          filled={isWishlisted}
        />
      </button>
      <Link
        to={product.href}
        className="w-full h-full text-center flex flex-col justify-between"
      >
        <div className="w-full h-40 flex items-center justify-center mb-4 bg-gray-50 dark:bg-gray-700 rounded-lg p-2">
          {product.image && !imageError ? (
            <img
              src={product.image}
              alt={product.title}
              className="h-full object-contain group-hover:scale-105 transition-transform duration-300"
              loading="lazy"
              onError={() => setImageError(true)}
            />
          ) : (
            <div className="text-center text-gray-400">
              <Icon.EmptyState width="80" height="80" strokeWidth="0.5" />
              <p className="text-xs mt-1">No image</p>
            </div>
          )}
        </div>

        <h3 className="text-sm sm:text-base font-semibold flex-grow text-slate-800 dark:text-gray-100 line-clamp-2">
          {product.title}
        </h3>

        {product.price && (
          <p className="mt-4 text-lg font-bold text-primary-600 dark:text-primary-400">
            ${product.price.toFixed(2)}
          </p>
        )}
      </Link>
    </li>
  );
};
