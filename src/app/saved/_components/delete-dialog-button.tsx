import { Button, Dialog } from "@vapor-ui/core";
import { useState } from "react";
import useSavedPlaceList from "../_hooks/useSavedPlaceList";

export interface DeleteDialogButtonProps {
  selectedItems: number[];
}

export default function DeleteDialogButton({
  selectedItems,
}: DeleteDialogButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { deleteBookmarks } = useSavedPlaceList();

  const handleDelete = async () => {
    await deleteBookmarks(selectedItems);
    setIsOpen(false);
  };

  return (
    <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
      <Dialog.Overlay className="z-50" />
      <Dialog.Trigger asChild>
        <Button size="sm" variant="ghost" className="text-primary-700">
          DELETE
        </Button>
      </Dialog.Trigger>
      <Dialog.Content className="z-60 w-[320px]">
        <Dialog.Header>
          <Dialog.Title>Are you sure delete?</Dialog.Title>
        </Dialog.Header>
        <Dialog.Body>This action cannot be undone.</Dialog.Body>
        <Dialog.Footer className="mt-[24px] flex gap-[8px]">
          <Dialog.Close asChild>
            <Button
              size="lg"
              stretch
              variant="ghost"
              className="text-black bg-[#F7F7FA]"
            >
              Cancel
            </Button>
          </Dialog.Close>
          <Button
            size="lg"
            stretch
            variant="fill"
            className="text-white bg-primary-700"
            onClick={handleDelete}
          >
            Delete
          </Button>
        </Dialog.Footer>
      </Dialog.Content>
    </Dialog.Root>
  );
}
