import { useState } from "react";
import { Icon } from "~/components/Icon/Icon";
import { DeleteModal } from "~/components/Modal/DeleteModal";
import { CartInterface } from "~/components/Product/Interfaces/ProductInterface";
import { NumberUtility } from "~/components/Utilities/NumberUtility";

interface CartItemInterface {
  product: CartInterface;
  onDelete: (id: number) => void;
}
export const CartItem: React.FunctionComponent<CartItemInterface> = ({
  product,
  onDelete,
}) => {
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
  return (
    <li className="flex items-center bg-white border rounded border-gray-200 p-1 sm:p-2">
      <div className="w-16 h-16 sm:w-[90px] sm:h-[90px] flex items-center justify-center py-1">
        <img
          src={product.image}
          alt={product.title}
          className="object-contain h-full"
        />
      </div>
      <div className="grow relative">
        <p className="pr-4">Name: {product.title}</p>
        <p>Price: {NumberUtility.formatMoney(product.price, "$")}</p>
        <label>Chosen count: </label>
        <input defaultValue={product.count} className="border pl-2 w-12" />

        <p>Available: {product.rating.count}</p>
        <Icon.Delete
          className="w-4 h-4 absolute bottom-1 right-1 hover:text-red-500 cursor-pointer transition-all"
          onClick={() =>
            handleDeleteClick({ id: product.id, title: product.title })
          }
        />
      </div>
      <DeleteModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={confirmDelete}
        productName={productToDelete?.title || ""}
      />
    </li>
  );
};
