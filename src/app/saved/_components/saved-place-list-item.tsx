import { Badge, Checkbox, IconButton, CheckboxRootProps } from "@vapor-ui/core";
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
  isRecommended,
  ...checkboxProps
}: SavedPlaceListItemProps) {
  return (
    <div
      className={clsx(
        "border-b border-[#F0F0F5] last:border-b-0",
        isRecommended && "bg-[#FCFCFC] pl-[16px] pt-[8px] pr-[24px]"
      )}
    >
      {isRecommended && (
        <div className="leading-[22px] text-[#8C8F9F] text-[14px] font-medium">
          AI Recommended Spots
        </div>
      )}
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
            {!isRecommended && (
              <IconButton
                aria-label="bookmarked"
                className="ml-auto rounded-full border-none bg-[#F8F8F9]"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="17"
                  viewBox="0 0 16 17"
                  fill="none"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M8.00101 11.9898L11.7835 13.5707C11.9153 13.6258 12.0606 13.529 12.0606 13.3862V3.3988C12.0606 3.28835 11.9711 3.1988 11.8606 3.1988H4.14062C4.03017 3.1988 3.94062 3.28835 3.94062 3.3988V13.3863C3.94062 13.5291 4.08598 13.6259 4.21774 13.5708L8.00101 11.9898ZM8.00098 13.3988L11.2822 14.7702C12.2704 15.1832 13.3606 14.4572 13.3606 13.3862V3.3988C13.3606 2.57038 12.6891 1.8988 11.8606 1.8988H4.14062C3.3122 1.8988 2.64062 2.57038 2.64062 3.3988V13.3863C2.64062 14.4573 3.73076 15.1833 4.71898 14.7703L8.00098 13.3988Z"
                    fill="#E8E8EE"
                  />
                </svg>
              </IconButton>
            )}
          </div>
        </Checkbox.Label>
      </Checkbox.Root>
    </div>
  );
}
