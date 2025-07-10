import OnboardingTitle from "../onboarding-title";
import Step01DateRange from "./step-01-date-range";
import { useFormContext } from "react-hook-form";
import { OnboardingSchema } from "../../_schemas/onboarding_schema";

export default function Step01() {
  const { watch, setValue } = useFormContext<OnboardingSchema>();
  const departureDate = watch("departure_date");
  const arrivalDate = watch("arrival_date");

  const selectedRange = {
    from: departureDate ? new Date(departureDate) : undefined,
    to: arrivalDate ? new Date(arrivalDate) : undefined,
  };

  return (
    <div className="px-[24px] mt-[8px]">
      <div className="flex flex-col gap-[48px]">
        <OnboardingTitle
          title={"When are you\ngoing on your trip?"}
          description="Let’s design your Jeju trip"
        />
        <Step01DateRange
          onSelect={(range) => {
            setValue("departure_date", range.from?.toISOString() || "");
            setValue("arrival_date", range.to?.toISOString() || "");
          }}
          inputSelectedRange={selectedRange}
        />
      </div>
    </div>
  );
}
