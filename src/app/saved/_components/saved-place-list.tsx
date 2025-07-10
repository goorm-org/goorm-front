"use client";

import { Checkbox } from "@vapor-ui/core";
import useSavedPlaceList from "../_hooks/useSavedPlaceList";
import SavedPlaceListItem from "./saved-place-list-item";
import { useState } from "react";
import DeleteDialogButton from "./delete-dialog-button";

export default function SavedPlaceList() {
  const { data } = useSavedPlaceList();
  const [selectedItems, setSelectedItems] = useState<number[]>([]);

  const handleSelectAll = () => {
    if (selectedItems.length === data?.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(data?.map((item) => item.id) || []);
    }
  };

  return (
    <div className="flex flex-col gap-[4px]">
      <div className="flex items-center justify-between">
        <Checkbox.Root
          size="lg"
          onCheckedChange={handleSelectAll}
          checked={selectedItems.length === data?.length}
        >
          <Checkbox.Control />
          <Checkbox.Label>{`Select All (${1}/${1})`}</Checkbox.Label>
        </Checkbox.Root>
        <DeleteDialogButton />
      </div>
      <div className="flex flex-col">
        {data?.map((item) => (
          <SavedPlaceListItem
            key={item.id}
            item={item}
            checked={selectedItems.includes(item.id)}
            onCheckedChange={(checked) => {
              if (checked) {
                setSelectedItems([...selectedItems, item.id]);
                return;
              }
              setSelectedItems(selectedItems.filter((id) => id !== item.id));
            }}
          />
        ))}
      </div>
    </div>
  );
}
