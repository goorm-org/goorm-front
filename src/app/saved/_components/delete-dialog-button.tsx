import { Button, Dialog } from "@vapor-ui/core";

export default function DeleteDialogButton() {
  return (
    <Dialog.Root>
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
        <Dialog.Footer className="mt-[24px]">
          <Button
            size="lg"
            stretch
            variant="ghost"
            className="text-black bg-[#F7F7FA]"
          >
            Cancel
          </Button>
          <Button
            size="lg"
            stretch
            variant="fill"
            className="text-white bg-primary-700"
          >
            Delete
          </Button>
        </Dialog.Footer>
      </Dialog.Content>
    </Dialog.Root>
  );
}
