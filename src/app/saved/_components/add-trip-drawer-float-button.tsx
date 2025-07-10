"use client";

import {
  getIsCompletedOnboardingFromSessionStorage,
  getOnboardingDataFromSessionStorage,
} from "@/app/_utils/session-storage";
import { Button } from "@vapor-ui/core";
import { useEffect, useState } from "react";
import { Drawer } from "vaul";
import BlankTripPlan from "./blank-trip-plan";
import SelectTripDate from "./select-trip-date";
import { OnboardingSchema } from "@/app/onboarding/_schemas/onboarding_schema";
import dayjs from "dayjs";

export interface AddTripDrawerFloatButtonProps {
  selectedItems: number[];
}

export default function AddTripDrawerFloatButton({
  selectedItems,
}: AddTripDrawerFloatButtonProps) {
  const [isCompletedOnboarding, setIsCompletedOnboarding] = useState(false);
  const [onboardingData, setOnboardingData] = useState<OnboardingSchema | null>(
    null
  );
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const isCompletedOnboarding = getIsCompletedOnboardingFromSessionStorage();
    const onboardingData = getOnboardingDataFromSessionStorage();
    if (isCompletedOnboarding && onboardingData?.arrival_date) {
      setIsCompletedOnboarding(true);
      setOnboardingData(onboardingData);
    }
  }, []);

  return (
    <Drawer.Root open={isOpen} onOpenChange={setIsOpen}>
      {!isOpen && (
        <Button
          onClick={() => setIsOpen(true)}
          size="xl"
          className="rounded-full bg-secondary-500 text-white font-bold fixed bottom-[126px] right-[50%] translate-x-[50%] shadow-[0px_4px_10px_0px_rgba(0,0,0,0.20)] z-50"
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
                d="M11.582 12.9999H6.58203C6.2987 12.9999 6.0612 12.904 5.86953 12.7124C5.67786 12.5207 5.58203 12.2832 5.58203 11.9999C5.58203 11.7165 5.67786 11.479 5.86953 11.2874C6.0612 11.0957 6.2987 10.9999 6.58203 10.9999H11.582V5.99988C11.582 5.71654 11.6779 5.47904 11.8695 5.28738C12.0612 5.09571 12.2987 4.99988 12.582 4.99988C12.8654 4.99988 13.1029 5.09571 13.2945 5.28738C13.4862 5.47904 13.582 5.71654 13.582 5.99988V10.9999H18.582C18.8654 10.9999 19.1029 11.0957 19.2945 11.2874C19.4862 11.479 19.582 11.7165 19.582 11.9999C19.582 12.2832 19.4862 12.5207 19.2945 12.7124C19.1029 12.904 18.8654 12.9999 18.582 12.9999H13.582V17.9999C13.582 18.2832 13.4862 18.5207 13.2945 18.7124C13.1029 18.904 12.8654 18.9999 12.582 18.9999C12.2987 18.9999 12.0612 18.904 11.8695 18.7124C11.6779 18.5207 11.582 18.2832 11.582 17.9999V12.9999Z"
                fill="white"
              />
            </svg>
            <span>Add To My Trip</span>
          </div>
        </Button>
      )}
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 bg-black/40 z-40" />
        <Drawer.Content className="bg-gray-100 flex flex-col rounded-t-[28px] mt-24 lg:h-fit  fixed bottom-0 left-0 right-0 z-40 w-full max-w-[393px] mx-auto">
          <div className="pt-4 bg-white rounded-t-[28px] flex-1 z-50">
            <div className="mx-auto w-12 h-1.5 flex-shrink-0 rounded-full bg-gray-300 mb-[16px]" />
            <div className="text-center text-[20px] font-bold leading-[30px] mb-[8px] pb-[8px] border-b border-gray-200">
              My Trip List
            </div>
            {isCompletedOnboarding ? (
              <SelectTripDate
                startDate={dayjs(onboardingData?.departure_date).format(
                  "YYYY.MM.DD"
                )}
                endDate={dayjs(onboardingData?.arrival_date).format(
                  "YYYY.MM.DD"
                )}
                diffDays={dayjs(onboardingData?.arrival_date).diff(
                  dayjs(onboardingData?.departure_date),
                  "day"
                )}
                selectedItems={selectedItems}
              />
            ) : (
              <BlankTripPlan />
            )}
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
}
