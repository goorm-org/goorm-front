import clsx from "clsx";

interface MuteToggleIconProps {
  showVolumeIcon: boolean;
  isMuted: boolean;
}

export default function MuteToggleIcon({
  showVolumeIcon,
  isMuted,
}: MuteToggleIconProps) {
  return (
    <div
      className={clsx(
        "bg-black bg-opacity-60 rounded-full p-4",
        "transform transition-all duration-500 ease-out",
        showVolumeIcon ? "opacity-100" : "opacity-0"
      )}
    >
      <div className="w-8 h-8 text-white">
        {isMuted ? (
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-full h-full"
          >
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
            <line x1="22" y1="9" x2="16" y2="15" />
            <line x1="16" y1="9" x2="22" y2="15" />
          </svg>
        ) : (
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-full h-full"
          >
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
            <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
            <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
          </svg>
        )}
      </div>
    </div>
  );
}
