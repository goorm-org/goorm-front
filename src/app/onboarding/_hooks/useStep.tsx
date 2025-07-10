"use client";

import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

const ONBOARDING_LAST_STEP = "3";

const useStep = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const step = searchParams.get("step") ?? "1";

  const nextStep = () => {
    if (step === ONBOARDING_LAST_STEP.toString()) {
      return;
    }
    const params = new URLSearchParams(searchParams);
    params.set("step", (Number(step) + 1).toString());
    router.push(`/onboarding?${params.toString()}`);
  };

  return {
    step,
    nextStep,
    isLastStep: step === ONBOARDING_LAST_STEP,
  };
};

export default useStep;
