import { Link } from "@remix-run/react";
import { Icon } from "~/components/Icon/Icon";

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
  return (
    <li className="group flex flex-col items-center border rounded-lg border-gray-200 p-4 bg-white hover:shadow-card-hover hover:border-primary-300 transition-all duration-300">
      <Link
        to={product.href}
        className="w-full h-full text-center flex flex-col justify-between"
      >
        <div className="w-full h-40 flex items-center justify-center mb-4 bg-gray-50 rounded-lg p-2">
          {product.image ? (
            <img
              src={product.image}
              alt={product.title}
              className="h-full object-contain group-hover:scale-105 transition-transform duration-300"
              loading="lazy"
            />
          ) : (
            <Icon.EmptyState width="160" height="160" strokeWidth={"0.5"} />
          )}
        </div>

        <h3 className="text-sm sm:text-base font-semibold flex-grow text-slate-800 line-clamp-2">
          {product.title}
        </h3>

        {product.price && (
          <p className="mt-4 text-lg font-bold text-primary-600">
            ${product.price.toFixed(2)}
          </p>
        )}
      </Link>
    </li>
  );
};
