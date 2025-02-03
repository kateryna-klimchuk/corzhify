import { useState } from "react";
import { Button } from "~/components/Button/Button";
import { Icon } from "~/components/Icon/Icon";
import { Modal } from "~/components/Modal/Modal";
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
  const [isModalOpen, setIsModalOpen] = useState(false);

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
          return (
            <CartItem
              key={index}
              product={product}
              // TODO: Implement onDelete function
              onDelete={function (id: number): void {
                throw new Error("Function not implemented.");
              }}
            />
          );
        })}
      </ul>
      <div className="flex items-center gap-4 mt-2">
        <p className="content-end">Total amount: $173.95</p>
        <Button
          label={
            <div className="flex items-center gap-2">
              <Icon.Coin className="w-4 h-4" />
              <p>I am ready to order</p>
            </div>
          }
          size="medium"
          onClick={() => setIsModalOpen(true)}
        />
      </div>
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={() => setIsModalOpen(false)}
        modalBody={
          <p className="mt-4 text-sm">
            You are about to complete your payment of $173.95. Once confirmed,
            this transaction cannot be canceled. Would you like to continue?
          </p>
        }
        title={"Confirm Your Payment"}
      />
    </div>
  );
};
