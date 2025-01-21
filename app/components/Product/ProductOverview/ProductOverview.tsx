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
      <div className="w-full h-[520px] flex items-center justify-center mb-4 p-2">
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
      </div>
    </div>
  );
};
