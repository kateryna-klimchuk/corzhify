import { ProductInterface } from "../Product/Interfaces/ProductInterface";
import { ProductOverviewRow } from "../Product/ProductOverview/ProductOverviewRow/ProductOverviewRow";

interface CartInterface {
  product: ProductInterface;
}
export const Cart: React.FunctionComponent<CartInterface> = ({ product }) => {
  return (
    <li className="flex bg-white border rounded border-gray-200">
      <div className="w-[220px] h-[120px] flex items-center justify-center mb-4 p-2">
        <img
          src={product.image}
          alt={product.title}
          className="object-contain h-full"
        />
      </div>
      <div className="grow border-l">
        <ul className="divide-y divide-gray-100">
          <ProductOverviewRow
            label="Name"
            description={product.title}
            hasLink={true}
          />
          <ProductOverviewRow
            label="Price"
            description={`$ ${product.price}`}
          />
          <ProductOverviewRow
            label="Available"
            description={product.rating.count}
          />
        </ul>
      </div>
    </li>
  );
};
