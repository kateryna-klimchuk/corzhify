import { Dialog, DialogPanel } from "@headlessui/react";
import { Button } from "../Button/Button";

interface ModalInterface {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  productName: string;
}

export const Modal: React.FC<ModalInterface> = ({
  isOpen,
  onClose,
  onConfirm,
  productName,
}) => {
  // TODO: Implement reusable modal
  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" />
      <div className="fixed inset-0 w-screen overflow-y-auto">
        <div className="flex items-center justify-center min-h-full p-4">
          <DialogPanel className="mx-auto max-w-sm rounded bg-white p-6">
            <Dialog.Title className="text-lg font-bold">
              Delete the cart item
            </Dialog.Title>
            <Dialog.Description className="text-sm text-gray-600">
              This will permanently delete the cart item.
            </Dialog.Description>

            <p className="mt-4 text-sm">
              Are you sure you want to delete{" "}
              <span className="font-bold">{productName}</span> from your cart?
              This action cannot be undone.
            </p>

            <div className="mt-6 flex justify-end space-x-4">
              <Button
                onClick={() => {
                  onConfirm();
                  onClose();
                }}
                label="Delete"
                color="red"
                size="medium"
              />
              <Button
                onClick={onClose}
                label="Cancel"
                color="white"
                size="medium"
              />
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
};
