import { Button } from "~/components/Button/Button";
import { Icon } from "~/components/Icon/Icon";
import { ProductInterface } from "../Interfaces/ProductInterface";
import { ProductOverviewRow } from "./ProductOverviewRow/ProductOverviewRow";

export interface ProductOverviewInterface {
  product: ProductInterface;
}

export const ProductOverview: React.FunctionComponent<
  ProductOverviewInterface
> = ({ product }) => {
  return (
    <div className="grid grid-cols-2 gap-4 bg-white border rounded border-gray-200">
      <div className="w-full h-[520px] flex items-center justify-center mb-4 p-1 sm:p-2">
        <img
          src={product.image}
          alt={product.title}
          className="object-contain h-full"
        />
      </div>
      <div className="border-l">
        <ul className="divide-y divide-gray-100">
          <ProductOverviewRow
            label="Name"
            description={product.title}
            background="bg-gray-50"
          />
          <ProductOverviewRow label="Category" description={product.category} />
          <ProductOverviewRow
            label="Price"
            description={`$ ${product.price}`}
            background="bg-gray-50"
          />
          <ProductOverviewRow
            label="Available"
            description={product.rating.count}
          />
          <ProductOverviewRow
            label="Product rating"
            description={product.rating.rate}
            background="bg-gray-50"
          />
          <ProductOverviewRow
            label="Description"
            description={product.description}
          />
        </ul>
        <div className="flex gap-2 ml-1 sm:ml-3">
          <input
            placeholder="0"
            className="border border-gray-300 pl-2 rounded text-xs sm:text-sm focus:border-orange-400 focus:ring-orange-400 outline-none"
          />
          <Button label={<Icon.Cart className="w-6 sm:w-8 h-6 sm:h-8" />} />
        </div>
      </div>
    </div>
  );
};
