"use client";

import OnboardingFooter from "./_components/onboarding-footer";
import OnboardingHeader from "./_components/onboarding-header";
import Step01 from "./_components/step01/step-01";
import Step02 from "./_components/step02/step-02";
import Step03 from "./_components/step03/step03";
import useStep from "./_hooks/useStep";
import { FormProvider, useForm } from "react-hook-form";
import {
  OnboardingSchema,
  onboardingSchema,
  defaultValues,
} from "./_schemas/onboarding_schema";
import { zodResolver } from "@hookform/resolvers/zod";

export default function OnboardingPage() {
  const form = useForm<OnboardingSchema>({
    resolver: zodResolver(onboardingSchema),
    defaultValues,
  });

  const { step } = useStep();

  const renderStep = () => {
    switch (step) {
      case "1":
        return <Step01 />;
      case "2":
        return <Step02 />;
      case "3":
        return <Step03 />;
      default:
        return null;
    }
  };

  return (
    <FormProvider {...form}>
      <div className="relative h-full">
        <OnboardingHeader />
        {renderStep()}
        <div className="absolute bottom-0 w-full">
          <OnboardingFooter />
        </div>
      </div>
    </FormProvider>
  );
}
