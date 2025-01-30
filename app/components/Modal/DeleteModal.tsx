import { Modal } from "./Modal";

// TODO: Write separate file with interfaces

interface DeleteModalInterface {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  productName: string;
}

export const DeleteModal: React.FunctionComponent<DeleteModalInterface> = ({
  isOpen,
  onClose,
  onConfirm,
  productName,
}) => {
  return (
    <Modal
      title="Delete the cart item"
      description="This will permanently delete the cart item."
      isOpen={isOpen}
      onClose={onClose}
      onConfirm={onConfirm}
      modalBody={
        <p className="mt-4 text-sm">
          Are you sure you want to delete{" "}
          <span className="font-bold">{productName}</span> from your cart? This
          action cannot be undone.
        </p>
      }
    />
  );
};
