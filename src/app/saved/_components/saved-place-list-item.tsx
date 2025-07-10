import { Badge, Checkbox, CheckboxRootProps } from "@vapor-ui/core";
import Image from "next/image";
import PriorityTag from "./priority-tag";
import clsx from "clsx";

export interface SavedPlaceListItemProps extends CheckboxRootProps {
  name: string;
  category: string;
  priority: "HIGH" | "MEDIUM" | "LOW";
  image: string;
  isRecommended: boolean;
  id: string;
}

export default function SavedPlaceListItem({
  name,
  category,
  priority,
  image,
  ...checkboxProps
}: SavedPlaceListItemProps) {
  return (
    <div className={clsx("border-b border-[#F0F0F5] last:border-b-0")}>
      <Checkbox.Root
        className="flex items-center gap-[4px] w-full"
        {...checkboxProps}
      >
        <Checkbox.Control />
        <Checkbox.Label className="w-full">
          <div className="py-[16px] px-[4px] flex gap-[12px] w-full">
            <Image
              src={image}
              alt={name}
              width={64}
              height={64}
              className="rounded-full bg-gray-200 object-cover w-[64px] h-[64px] flex-shrink-0"
            />
            <div className="flex flex-col gap-[8px]">
              <div className="text-[18px] font-bold leading-[26px]">{name}</div>
              <div className="flex">
                <Badge className="rounded-full text-primary-700 bg-[#FCEBD9]">
                  {category}
                </Badge>
                <div className="leading-[24px] text-[#CDCED6] text-[16px] w-[15px] h-[24px] flex items-center justify-center">
                  ・
                </div>
                <PriorityTag priority={priority} />
              </div>
            </div>
          </div>
        </Checkbox.Label>
      </Checkbox.Root>
    </div>
  );
}
