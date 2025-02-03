import { Dialog, DialogPanel } from "@headlessui/react";
import { Button } from "../Button/Button";

interface ModalInterface {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  modalBody: React.ReactNode;
  title: string;
  description?: string;
  actionType?: "confirm" | "delete";
}

export const Modal: React.FC<ModalInterface> = ({
  isOpen,
  onClose,
  onConfirm,
  modalBody,
  title,
  description,
  actionType = "confirm",
}) => {
  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" />
      <div className="fixed inset-0 w-screen overflow-y-auto">
        <div className="flex items-center justify-center min-h-full p-4">
          <DialogPanel className="mx-auto max-w-sm rounded bg-white p-6">
            <Dialog.Title className="text-lg font-bold">{title}</Dialog.Title>
            <Dialog.Description className="text-sm text-gray-600">
              {description && description}
            </Dialog.Description>
            {modalBody}
            <div className="mt-6 flex justify-end space-x-4">
              {actionType === "delete" ? (
                <Button
                  onClick={() => {
                    onConfirm();
                    onClose();
                  }}
                  label="Delete"
                  color="red"
                  size="medium"
                />
              ) : (
                <Button
                  onClick={() => {
                    onConfirm();
                    onClose();
                  }}
                  label="Confirm"
                  color="blue"
                  size="medium"
                />
              )}

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
