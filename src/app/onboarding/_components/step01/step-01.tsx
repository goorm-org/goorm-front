import { useState } from "react";
import OnboardingTitle from "../onboarding-title";
import Step01DateRange from "./step-01-date-range";
import { DateRange } from "react-day-picker";

export default function Step01() {
  const [selectedRange, setSelectedRange] = useState<DateRange | undefined>(
    undefined
  );

  return (
    <div className="px-[24px] mt-[8px]">
      <div className="flex flex-col gap-[48px]">
        <OnboardingTitle
          title={"When are you\ngoing on your trip?"}
          description="Let’s design your Jeju trip"
        />
        <Step01DateRange
          onSelect={setSelectedRange}
          inputSelectedRange={selectedRange}
        />
      </div>
    </div>
  );
}
