import { useState, useEffect } from "react";
import { Button } from "~/components/Button/Button";
import { Icon } from "~/components/Icon/Icon";
import { Modal } from "~/components/Modal/Modal";
import { NumberUtility } from "~/components/Utilities/NumberUtility";
import { ProductInterface } from "../../Product/Interfaces/ProductInterface";
import { CartItem } from "../CartItem/CartItem";
import { useCart } from "~/contexts/CartContext";
import { CartService } from "~/services/api";
import { Product } from "~/types";

export const Cart: React.FunctionComponent = () => {
  const { cart, removeFromCart, clearCart } = useCart();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setIsLoading(true);
        const fetchedProducts = await CartService.getCartProducts(cart);
        setProducts(fetchedProducts);
      } catch (error) {
        console.error("Failed to load cart products:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (cart.products.length > 0) {
      loadProducts();
    } else {
      setProducts([]);
      setIsLoading(false);
    }
  }, [cart]);

  const productQuantities = cart.products.reduce<Record<number, number>>(
    (acc, product) => {
      acc[product.productId] = product.quantity;
      return acc;
    },
    {}
  );

  const result = products.map((product) => ({
    ...product,
    count: productQuantities[product.id] || 0,
  }));

  const totalAmount = result.reduce((acc, item) => {
    const total = item.count * item.price;
    return acc + total;
  }, 0);

  const cartTotalAmount = NumberUtility.formatMoney(totalAmount, "$");

  const handleConfirmOrder = () => {
    clearCart();
    setIsModalOpen(false);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-12">
        <p className="text-slate-600">Loading cart...</p>
      </div>
    );
  }

  return (
    <div className="shadow-sm p-2 rounded text-xs sm:text-base">
      <ul className="grid gap-2">
        {result.map((product) => {
          return (
            <CartItem
              key={product.id}
              product={product}
              onDelete={removeFromCart}
            />
          );
        })}
      </ul>
      <div className="flex items-center gap-4 mt-2">
        <p className="content-end">Total amount: {cartTotalAmount}</p>
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
        onConfirm={handleConfirmOrder}
        modalBody={
          <p className="mt-4 text-sm">
            You are about to complete your payment of {cartTotalAmount}. Once
            confirmed, this transaction cannot be canceled. Would you like to
            continue?
          </p>
        }
        title={"Confirm Your Payment"}
      />
    </div>
  );
};
