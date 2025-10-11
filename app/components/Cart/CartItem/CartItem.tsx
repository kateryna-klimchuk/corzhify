import { useState } from "react";
import { Icon } from "~/components/Icon/Icon";
import { DeleteModal } from "~/components/Modal/DeleteModal";
import { CartInterface } from "~/components/Product/Interfaces/ProductInterface";
import { NumberUtility } from "~/components/Utilities/NumberUtility";
import { useCart } from "~/contexts/CartContext";

interface CartItemInterface {
  product: CartInterface;
  onDelete: (id: number) => void;
}
export const CartItem: React.FunctionComponent<CartItemInterface> = ({
  product,
  onDelete,
}) => {
  const { updateQuantity } = useCart();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState<{
    id: number;
    title: string;
  } | null>(null);

  const handleDeleteClick = (product: { id: number; title: string }) => {
    setProductToDelete(product);
    setIsModalOpen(true);
  };

  const confirmDelete = () => {
    if (productToDelete) {
      onDelete(productToDelete.id);
      setProductToDelete(null);
    }
  };

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity > 0 && newQuantity <= product.rating.count) {
      updateQuantity(product.id, newQuantity);
    }
  };
  return (
    <li className="flex items-center bg-white border rounded-lg border-gray-200 p-3 sm:p-4 hover:shadow-md transition-shadow">
      <div className="w-20 h-20 sm:w-24 sm:h-24 flex items-center justify-center bg-gray-50 rounded-lg p-2">
        <img
          src={product.image}
          alt={product.title}
          className="object-contain h-full"
        />
      </div>
      <div className="grow ml-4">
        <p className="font-semibold text-slate-800 mb-1 pr-8">{product.title}</p>
        <p className="text-primary-600 font-bold text-lg mb-2">
          {NumberUtility.formatMoney(product.price, "$")}
        </p>
        <div className="flex items-center gap-2 mt-2">
          <label htmlFor={`qty-${product.id}`} className="text-sm text-slate-600">
            Qty:
          </label>
          <input
            id={`qty-${product.id}`}
            type="number"
            value={product.count}
            onChange={(e) => handleQuantityChange(parseInt(e.target.value) || 1)}
            min="1"
            max={product.rating.count}
            className="border border-gray-300 rounded-md px-2 py-1 w-16 focus:ring-2 focus:ring-primary-400 focus:border-transparent outline-none text-sm"
            aria-label={`Quantity for ${product.title}`}
          />
          <span className="text-xs text-slate-500">
            ({product.rating.count} available)
          </span>
        </div>
      </div>
      <button
        onClick={() =>
          handleDeleteClick({ id: product.id, title: product.title })
        }
        className="ml-2 p-2 rounded-lg hover:bg-red-50 transition-colors"
        aria-label={`Remove ${product.title} from cart`}
      >
        <Icon.Delete className="w-5 h-5 text-slate-400 hover:text-red-500 transition-colors" />
      </button>
      <DeleteModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={confirmDelete}
        productName={productToDelete?.title || ""}
      />
    </li>
  );
};
