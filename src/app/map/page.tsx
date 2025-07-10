"use client";

import { useState } from "react";
import { Drawer } from "vaul";
import PlaceBottomSheets from "@/app/_components/place-bottom-sheets";

const snapPoints = ["320px", 1];
export default function Map() {
  const [snap, setSnap] = useState<number | string | null>(snapPoints[0]);

  return (
    <Drawer.Root
      snapPoints={snapPoints}
      activeSnapPoint={snap}
      setActiveSnapPoint={setSnap}
    >
      <Drawer.Trigger>Open Drawer</Drawer.Trigger>
      <Drawer.Portal>
        <PlaceBottomSheets snap={snap} />
      </Drawer.Portal>
    </Drawer.Root>
  );
}
