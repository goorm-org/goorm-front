"use client";

import PlaceBottomSheets from "@/app/_components/place-bottom-sheets";
import { IconButton } from "@vapor-ui/core";
import { useState } from "react";
import { Drawer } from "vaul";

const snapPoints = ["320px", 1];

export default function DetailDrawerButton() {
  const [snap, setSnap] = useState<number | string | null>(snapPoints[0]);
  return (
    <Drawer.Root
      snapPoints={snapPoints}
      activeSnapPoint={snap}
      setActiveSnapPoint={setSnap}
    >
      <Drawer.Trigger>
        <IconButton
          size="sm"
          className="bg-primary-700 rounded-full"
          aria-label="detail"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
          >
            <path
              d="M5.78804 11.0903C5.5342 11.3442 5.5342 11.7557 5.78804 12.0096C6.04188 12.2634 6.45343 12.2634 6.70728 12.0096L10.18 8.53682C10.4766 8.24029 10.4766 7.75952 10.18 7.46299L6.70728 3.99023C6.45344 3.73639 6.04188 3.73639 5.78804 3.99023C5.5342 4.24408 5.5342 4.65563 5.78804 4.90947L8.87847 7.9999L5.78804 11.0903Z"
              fill="white"
            />
          </svg>
        </IconButton>
      </Drawer.Trigger>
      <Drawer.Portal>
        <PlaceBottomSheets snap={snap} />
      </Drawer.Portal>
    </Drawer.Root>
  );
}
