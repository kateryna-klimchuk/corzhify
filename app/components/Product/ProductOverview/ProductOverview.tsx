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
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white border rounded-lg border-gray-200 shadow-card overflow-hidden">
      <div className="w-full h-[400px] md:h-[520px] flex items-center justify-center bg-gray-50 p-4 md:p-8">
        <img
          src={product.image}
          alt={product.title}
          className="object-contain h-full"
          loading="lazy"
        />
      </div>
      <div className="flex flex-col p-4 md:p-6">
        <ul className="divide-y divide-gray-100 flex-grow">
          <ProductOverviewRow
            label="Name"
            description={product.title}
            background="bg-gray-50"
          />
          <ProductOverviewRow label="Category" description={product.category} />
          <ProductOverviewRow
            label="Price"
            description={`$${product.price.toFixed(2)}`}
            background="bg-gray-50"
          />
          <ProductOverviewRow
            label="Available"
            description={`${product.rating.count} in stock`}
          />
          <ProductOverviewRow
            label="Product rating"
            description={`⭐ ${product.rating.rate}/5`}
            background="bg-gray-50"
          />
          <ProductOverviewRow
            label="Description"
            description={product.description}
          />
        </ul>
        <div className="flex gap-3 mt-6 pt-4 border-t">
          <input
            type="number"
            min="1"
            max={product.rating.count}
            defaultValue="1"
            placeholder="Qty"
            className="border border-gray-300 px-3 py-2 rounded-lg text-sm md:text-base focus:ring-2 focus:ring-primary-400 focus:border-transparent outline-none w-20"
            aria-label="Quantity"
          />
          <Button
            label={
              <div className="flex items-center gap-2">
                <Icon.Cart className="w-5 md:w-6 h-5 md:h-6" />
                <span className="hidden sm:inline">Add to Cart</span>
              </div>
            }
            size="medium"
          />
        </div>
      </div>
    </div>
  );
};
