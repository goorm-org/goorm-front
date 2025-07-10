"use client";

import OnboardingFooter from "./_components/onboarding-footer";
import OnboardingHeader from "./_components/onboarding-header";
import Step01 from "./_components/step01/step-01";
import Step02 from "./_components/step02/step-02";
import useStep from "./_hooks/useStep";

export default function OnboardingPage() {
  const { step } = useStep();

  const renderStep = () => {
    switch (step) {
      case "1":
        return <Step01 />;
      case "2":
        return <Step02 />;
      default:
        return null;
    }
  };

  return (
    <div className="relative h-full">
      <OnboardingHeader />
      {renderStep()}
      <div className="absolute bottom-0 w-full">
        <OnboardingFooter />
      </div>
    </div>
  );
}
