"use client";

import CheckboxButtonGroup from "@/app/_components/checkbox-button-group";
import OnboardingTitle from "../onboarding-title";
import { CATEGORY_FILTER_OPTIONS } from "@/app/_constants/filter";
import { useFormContext } from "react-hook-form";
import { OnboardingSchema } from "../../_schemas/onboarding_schema";

export default function Step02() {
  const { watch, setValue } = useFormContext<OnboardingSchema>();
  const filterOptions = watch("category_filter_options");
  return (
    <div className="px-[24px] mt-[8px]">
      <div className="flex flex-col gap-[48px]">
        <OnboardingTitle
          title="Where would you like to go?"
          description="Let’s design your Jeju trip"
        />
        <CheckboxButtonGroup
          options={CATEGORY_FILTER_OPTIONS}
          selectedValues={filterOptions}
          onSelect={(value) => {
            if (filterOptions.includes(value)) {
              setValue(
                "category_filter_options",
                filterOptions.filter((v) => v !== value)
              );
            } else {
              setValue("category_filter_options", [...filterOptions, value]);
            }
          }}
        />
      </div>
    </div>
  );
}
