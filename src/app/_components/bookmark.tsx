"use client";

import Image from "next/image";
import { Button } from "@vapor-ui/core";
// import { BookmarkIcon } from "@vapor-ui/icons";
import IcoBookmarkBefore from "@/app/_assets/icons/ico-bookmark-before.svg";
import IcoBookmarkAfter from "@/app/_assets/icons/ico-bookmark-after.svg";

export default function Bookmark({ isLiked = false }: { isLiked: boolean }) {
  return (
    <Button variant="ghost" className="p-0 rounded-full">
      <span className="sr-only">bookmark</span>
      <Image
        src={isLiked ? IcoBookmarkAfter : IcoBookmarkBefore}
        alt="bookmark icon"
        width={32}
        height={32}
        className="w-8 h-8 rounded-full"
      />
    </Button>
  );
}
