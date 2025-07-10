import { Button, Card } from "@vapor-ui/core";
import useStep from "../_hooks/useStep";
import { useFormContext } from "react-hook-form";
import {
  onboardingSchema,
  OnboardingSchema,
} from "../_schemas/onboarding_schema";
import { useRouter } from "next/navigation";
import {
  setIsCompletedOnboardingToSessionStorage,
  setOnboardingDataToSessionStorage,
} from "@/app/_utils/session-storage";
import { useState } from "react";
import Loading from "@/app/_components/loading";
import { postOnboardingInfo } from "../_apis/onboarding.api";
import dayjs from "dayjs";

// Step별 validation 필드 매핑
const STEP_VALIDATION_FIELDS = {
  "1": ["departure_date", "arrival_date"] as const,
  "2": ["placeCategoryList"] as const,
  "3": ["vibeList"] as const,
} as const;

export default function OnboardingFooter() {
  const router = useRouter();
  const { nextStep, step, isLastStep } = useStep();
  const [isLoading, setIsLoading] = useState(false);
  const { watch, handleSubmit } = useFormContext<OnboardingSchema>();

  const isValid = () => {
    const fieldsToValidate =
      STEP_VALIDATION_FIELDS[step as keyof typeof STEP_VALIDATION_FIELDS];

    if (!fieldsToValidate) return true;

    const pickObject = fieldsToValidate.reduce((acc, field) => {
      acc[field] = true;
      return acc;
    }, {} as Record<string, true>);

    return onboardingSchema.pick(pickObject).safeParse(watch()).success;
  };

  const onSubmit = async (data: OnboardingSchema) => {
    setOnboardingDataToSessionStorage(data);
    setIsLoading(true);
    await postOnboardingInfo({
      vibeList: data.vibeList,
      placeCategoryList: data.placeCategoryList,
      from: dayjs(data.departure_date).format("YYYY-MM-DD"),
      to: dayjs(data.arrival_date).format("YYYY-MM-DD"),
    });
    setIsCompletedOnboardingToSessionStorage();
    router.push("/explore");
  };

  return (
    <Card.Root className="border-none">
      <Card.Footer>
        <Button
          stretch
          className="bg-primary-700"
          size="lg"
          onClick={isLastStep ? handleSubmit(onSubmit) : nextStep}
          disabled={!isValid()}
        >
          NEXT STEP
        </Button>
      </Card.Footer>
      {isLoading && <Loading />}
    </Card.Root>
  );
}
