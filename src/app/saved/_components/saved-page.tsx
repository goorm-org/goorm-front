"use client";

import { useState } from "react";
import AddTripDrawerFloatButton from "./add-trip-drawer-float-button";
import SavedPlaceList from "./saved-place-list";

export default function SavedPage() {
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  return (
    <div className="px-[24px] pt-[24px] pb-[50px]">
      <div className="font-bold text-[24px] px-[8px]">Saved Place List</div>
      <div className="mt-[24px]">
        <SavedPlaceList
          selectedItems={selectedItems}
          setSelectedItems={setSelectedItems}
        />
      </div>
      <AddTripDrawerFloatButton selectedItems={selectedItems} />
    </div>
  );
}
