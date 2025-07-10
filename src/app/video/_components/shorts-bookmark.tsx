"use client";

import clsx from "clsx";

export interface ShortsBookmarkProps {
  isBookmarked: boolean;
  onToggle: () => void;
}

export default function ShortsBookmark({
  isBookmarked,
  onToggle,
}: ShortsBookmarkProps) {
  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        e.preventDefault();
        onToggle();
      }}
      className={clsx(
        "bg-black bg-opacity-60 rounded-full p-3",
        "transform transition-all duration-300 ease-out",
        "hover:bg-opacity-80 active:scale-95",
        "focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50"
      )}
      aria-label={isBookmarked ? "북마크 해제" : "북마크 추가"}
    >
      <div className="w-6 h-6">
        {isBookmarked ? (
          <svg
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-full h-full text-yellow-400"
          >
            <path d="M5 2v20l7-5 7 5V2H5z" />
          </svg>
        ) : (
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-full h-full text-white"
          >
            <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
          </svg>
        )}
      </div>
    </button>
  );
}
