"use client";

import {
  LOCATION_FILTER_OPTIONS,
  CATEGORY_FILTER_OPTIONS,
} from "@/app/_constants/filter";
import { Button, Card } from "@vapor-ui/core";
import { Drawer } from "vaul";
import ShortsFilterGroup from "./shorts-filter-group";
import { useEffect, useState } from "react";
import {
  getOnboardingDataFromSessionStorage,
  updateOnboardingDataToSessionStorage,
} from "@/app/_utils/filter";

export default function FilterDrawerButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedPlaceCategory, setSelectedPlaceCategory] = useState<string[]>(
    []
  );
  const [selectedLocation, setSelectedLocation] = useState<string[]>([]);

  const onClickApplyFilter = () => {
    updateOnboardingDataToSessionStorage({
      location_filter_options: selectedLocation,
      category_filter_options: selectedPlaceCategory,
    });
    setIsOpen(false);
  };

  useEffect(() => {
    if (!isOpen) return;
    const onboardingData = getOnboardingDataFromSessionStorage();
    if (onboardingData) {
      setSelectedLocation(onboardingData.location_filter_options);
      setSelectedPlaceCategory(onboardingData.category_filter_options);
    }
  }, [isOpen]);

  return (
    <Drawer.Root open={isOpen} onOpenChange={setIsOpen}>
      <Drawer.Trigger>
        {!isOpen && (
          <Button
            size="xl"
            className="rounded-full bg-white text-black font-bold"
          >
            <div className="flex gap-[8px]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="25"
                height="24"
                viewBox="0 0 25 24"
                fill="none"
              >
                <path
                  d="M11.5831 20C11.2998 20 11.0623 19.9042 10.8706 19.7125C10.6789 19.5208 10.5831 19.2833 10.5831 19V13L4.78309 5.6C4.53309 5.26667 4.49559 4.91667 4.67059 4.55C4.84559 4.18333 5.14975 4 5.58309 4H19.5831C20.0164 4 20.3206 4.18333 20.4956 4.55C20.6706 4.91667 20.6331 5.26667 20.3831 5.6L14.5831 13V19C14.5831 19.2833 14.4873 19.5208 14.2956 19.7125C14.1039 19.9042 13.8664 20 13.5831 20H11.5831Z"
                  fill="#3E404C"
                />
              </svg>
              <span>Add Filter</span>
            </div>
          </Button>
        )}
      </Drawer.Trigger>
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 bg-black/40 z-40" />
        <Drawer.Content className="bg-gray-100 flex flex-col rounded-t-[28px] mt-24 lg:h-fit  fixed bottom-0 left-0 right-0 z-40 w-full max-w-[393px] mx-auto">
          <div className="pt-4 bg-white rounded-t-[28px] flex-1 z-50">
            <div className="mx-auto w-12 h-1.5 flex-shrink-0 rounded-full bg-gray-300 mb-[16px]" />
            <div className="text-center text-[20px] font-bold leading-[30px] mb-[8px]">
              Place Filter
            </div>
            <div>
              <ShortsFilterGroup
                title="Place Category"
                options={CATEGORY_FILTER_OPTIONS}
                selectedValues={selectedPlaceCategory}
                onSelect={(value) => {
                  if (selectedPlaceCategory.includes(value)) {
                    setSelectedPlaceCategory(
                      selectedPlaceCategory.filter((v) => v !== value)
                    );
                  } else {
                    setSelectedPlaceCategory([...selectedPlaceCategory, value]);
                  }
                }}
              />
              <ShortsFilterGroup
                title="Location"
                className="border-t-0"
                options={LOCATION_FILTER_OPTIONS}
                selectedValues={selectedLocation}
                onSelect={(value) => {
                  if (selectedLocation.includes(value)) {
                    setSelectedLocation(
                      selectedLocation.filter((v) => v !== value)
                    );
                  } else {
                    setSelectedLocation([...selectedLocation, value]);
                  }
                }}
              />
              <Card.Root className="border-none">
                <Card.Footer className="border-none">
                  <Button
                    size="xl"
                    className="bg-primary-700"
                    stretch
                    onClick={onClickApplyFilter}
                  >
                    APPLY
                  </Button>
                </Card.Footer>
              </Card.Root>
            </div>
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
}
