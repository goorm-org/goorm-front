import CheckboxButtonGroup, {
  CheckboxButtonGroupProps,
} from "@/app/_components/checkbox-button-group";
import { Badge } from "@vapor-ui/core";
import clsx from "clsx";

export interface ShortsFilterGroupProps extends CheckboxButtonGroupProps {
  title: string;
  className?: string;
}

export default function ShortsFilterGroup({
  title,
  options,
  selectedValues,
  onSelect,
  className,
}: ShortsFilterGroupProps) {
  return (
    <div
      className={clsx(
        "p-[16px] border-t border-b border-l-0 border-r-0 border-[#E5E5EA]",
        className
      )}
    >
      <div className="flex flex-col gap-[8px]">
        <div className="flex gap-[10px] items-center">
          <div className="text-[16px] font-medium">{title}</div>
          <Badge
            className="rounded-full border-primary-700 text-primary-700 border bg-white"
            size="sm"
          >
            Mutiple-choice
          </Badge>
        </div>
        <CheckboxButtonGroup
          options={options}
          selectedValues={selectedValues}
          onSelect={onSelect}
        />
      </div>
    </div>
  );
}
