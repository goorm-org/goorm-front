"use client";

import OnboardingTitle from "../onboarding-title";

export default function Step02() {
  return (
    <div className="px-[24px] mt-[8px]">
      <div className="flex flex-col gap-[48px]">
        <OnboardingTitle
          title="Who are you traveling with?"
          description="Let’s design your Jeju trip"
        />
      </div>
    </div>
  );
}
