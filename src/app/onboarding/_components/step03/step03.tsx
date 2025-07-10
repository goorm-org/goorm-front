import CheckboxButtonGroup from "@/app/_components/checkbox-button-group";
import OnboardingTitle from "../onboarding-title";
import { LOCATION_FILTER_OPTIONS } from "@/app/_constants/filter";
import { useFormContext } from "react-hook-form";
import { OnboardingSchema } from "../../_schemas/onboarding_schema";

export default function Step03() {
  const { watch, setValue } = useFormContext<OnboardingSchema>();
  const filterOptions = watch("vibeList");
  return (
    <div className="px-[24px] mt-[8px]">
      <div className="flex flex-col gap-[48px]">
        <OnboardingTitle
          title="What’s your Jeju vibe?"
          description="Let’s design your Jeju trip"
        />
        <CheckboxButtonGroup
          options={LOCATION_FILTER_OPTIONS}
          selectedValues={filterOptions}
          onSelect={(value) => {
            if (filterOptions.includes(Number(value))) {
              setValue(
                "vibeList",
                filterOptions.filter((v) => v !== value)
              );
            } else {
              setValue("vibeList", [...filterOptions, Number(value)]);
            }
          }}
        />
      </div>
    </div>
  );
}
