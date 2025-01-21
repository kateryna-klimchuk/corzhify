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
    <li className="flex flex-col items-center border rounded border-gray-300 p-4 bg-white hover:shadow transition-all">
      <Link
        to={product.href}
        className="w-full h-full text-center flex flex-col justify-between"
      >
        <div className="w-full h-40 flex items-center justify-center mb-4">
          {product.image ? (
            <img
              src={product.image}
              alt={product.title}
              className="h-full object-contain"
            />
          ) : (
            <Icon.EmptyState width="160" height="160" strokeWidth={"1"} />
          )}
        </div>

        <h3 className="text-lg font-semibold flex-grow">{product.title}</h3>

        {product.price && (
          <p className="mt-4 text-base font-medium text-gray-700">
            Price: {product.price}$
          </p>
        )}
      </Link>
    </li>
  );
};
