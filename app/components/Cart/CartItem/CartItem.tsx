import { Icon } from "~/components/Icon/Icon";
import { CartInterface } from "~/components/Product/Interfaces/ProductInterface";

interface CartItemInterface {
  product: CartInterface;
}
export const CartItem: React.FunctionComponent<CartItemInterface> = ({
  product,
}) => {
  return (
    <li className="flex items-center bg-white border rounded border-gray-200">
      <div className="w-[90px] h-[90px] flex items-center justify-center py-1">
        <img
          src={product.image}
          alt={product.title}
          className="object-contain h-full"
        />
      </div>
      <div className="grow">
        <ul className="">
          <li className="relative">
            <Icon.Delete className="w-4 h-4 absolute top-1 right-1 hover:text-red-500 cursor-pointer transition-all" />
            <p className="pr-4">Name: {product.title}</p>
            <p>Price: ${product.price}</p>
            <label>Chosen count: </label>
            <input defaultValue={product.count} className="border pl-2 w-12" />

            <p>Available: {product.rating.count}</p>
          </li>
        </ul>
      </div>
    </li>
  );
};
