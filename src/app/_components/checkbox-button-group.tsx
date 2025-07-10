import { Button } from "@vapor-ui/core";
import clsx from "clsx";

export interface CheckboxButtonGroupProps {
  options: {
    label: string;
    value: string;
    icon?: {
      active: React.ReactNode;
      inactive: React.ReactNode;
    };
  }[];

  selectedValues: string[];
  onSelect: (value: string) => void;
}

export default function CheckboxButtonGroup({
  options,
  selectedValues,
  onSelect,
}: CheckboxButtonGroupProps) {
  return (
    <div className="flex flex-wrap gap-x-[8px] gap-y-[12px]">
      {options.map((option) => (
        <Button
          className={clsx(
            "rounded-full border text-black bg-[#F7F7FA] border-[#F7F7FA]",
            selectedValues.includes(option.value) &&
              "bg-[#fcf5ec] text-primary-700 border border-primary-700"
          )}
          size="lg"
          key={option.value}
          onClick={() => onSelect(option.value)}
        >
          <div className="flex gap-[8px] items-center">
            {option.icon && selectedValues.includes(option.value)
              ? option.icon.active
              : option.icon?.inactive}
            {option.label}
          </div>
        </Button>
      ))}
    </div>
  );
}
