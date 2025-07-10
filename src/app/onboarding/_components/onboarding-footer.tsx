import { Button, Card } from "@vapor-ui/core";
import useStep from "../_hooks/useStep";
import { FieldErrors, useFormContext } from "react-hook-form";
import {
  onboardingSchema,
  OnboardingSchema,
} from "../_schemas/onboarding_schema";
import { useRouter } from "next/navigation";
import { setOnboardingDataToLocalStorage } from "@/app/_utils/filter";
import { useState } from "react";
import Loading from "@/app/_components/loading";

// Step별 validation 필드 매핑
const STEP_VALIDATION_FIELDS = {
  "1": ["departure_date", "arrival_date"] as const,
  "2": ["category_filter_options"] as const,
  "3": ["location_filter_options"] as const,
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
    console.log(data);
    setOnboardingDataToLocalStorage(data);
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    // setIsLoading(false);
    router.push("/explore");
  };

  const onError = (error: FieldErrors<OnboardingSchema>) => {
    console.log(watch());
    console.log(error);
  };

  return (
    <Card.Root className="border-none">
      <Card.Footer>
        <Button
          stretch
          className="bg-primary-700"
          size="lg"
          onClick={isLastStep ? handleSubmit(onSubmit, onError) : nextStep}
          disabled={!isValid()}
        >
          NEXT STEP
        </Button>
      </Card.Footer>
      {isLoading && <Loading />}
    </Card.Root>
  );
}
