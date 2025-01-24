import { Button } from "~/components/Button/Button";
import { ProductInterface } from "../../Product/Interfaces/ProductInterface";
import { CartItem } from "../CartItem/CartItem";
import { CartItemInterface } from "../Interfaces/CartInterface";
interface CartInterface {
  products: ProductInterface[];
  carts: CartItemInterface[];
}
export const Cart: React.FunctionComponent<CartInterface> = ({
  products,
  carts,
}) => {
  const productQuantities = carts
    .flatMap((cart) => cart.products)
    .reduce<Record<number, number>>((acc, product) => {
      acc[product.productId] = (acc[product.productId] || 0) + product.quantity;
      return acc;
    }, {});

  const result = products.map((product) => ({
    ...product,
    count: productQuantities[product.id] || 0,
  }));

  return (
    <div className="shadow-sm p-2 rounded">
      <ul className="grid gap-2">
        {result.map((product, index) => {
          return <CartItem key={index} product={product} />;
        })}
      </ul>
      <div className="flex items-center gap-4 mt-2">
        <p className="content-end">Total amount: $173.95</p>
        <Button label="Pay now" size="medium" />
      </div>
    </div>
  );
};
