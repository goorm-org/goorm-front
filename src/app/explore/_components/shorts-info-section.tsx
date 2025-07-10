import useShorts, { ShortsData } from "../_hooks/useShorts";
import ShortsBookmark from "./shorts-bookmark";

interface ShortsInfoSectionProps {
  item: ShortsData;
}

export default function ShortsInfoSection({ item }: ShortsInfoSectionProps) {
  const { handleToggleBookmark } = useShorts();
  return (
    <div className="flex justify-between items-center bg-black">
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-white"></div>
          <div className="text-white text-sm">{item.user}</div>
        </div>
        <div className="text-white text-sm">{item.desc}</div>
      </div>
      <ShortsBookmark
        isBookmarked={item.isBookmarked}
        onToggle={() => handleToggleBookmark(item.id)}
      />
    </div>
  );
}
