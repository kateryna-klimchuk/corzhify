import { Link } from "@remix-run/react";
import { Icon } from "~/components/Icon/Icon";

interface ProductCardInterface {
  product: {
    id: string | number;
    title: string;
    image?: string;
    href: string;
  };
}
export const ProductCard: React.FunctionComponent<ProductCardInterface> = ({
  product,
}) => {
  return (
    <li className="border rounded border-gray-300 p-4 flex flex-col items-center">
      <Link to={product.href} className="block w-full text-center">
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
        <h3 className="text-lg font-semibold">{product.title}</h3>
      </Link>
    </li>
  );
};
