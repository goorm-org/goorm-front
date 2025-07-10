"use client";

import { Label } from "@/app/_components/label";
import { RadioGroup, RadioGroupItem } from "@/app/_components/radio-group";
import { useFormContext } from "react-hook-form";
import { OnboardingSchema } from "../../_schemas/onboarding_schema";

const RADIO_GROUP_ITEMS = [
  {
    label: "Just me, solo trip",
    value: "Just me, solo trip",
  },
  {
    label: "My partner (2 people)",
    value: "My partner (2 people)",
  },
  {
    label: "A few friends (3–5 people)",
    value: "A few friends (3–5 people)",
  },
  {
    label: "A group (6+)",
    value: "A group (6+)",
  },
  {
    label: "Not yet decided",
    value: "Not yet decided",
  },
];

export default function Step02RadioGroup() {
  const { watch, setValue } = useFormContext<OnboardingSchema>();
  const travelingWith = watch("traveling_with");
  console.log(travelingWith);
  return (
    <RadioGroup
      value={travelingWith}
      onValueChange={(value) => {
        setValue("traveling_with", value);
      }}
    >
      {RADIO_GROUP_ITEMS.map((item) => (
        <div className="flex items-center gap-[8px]" key={item.value}>
          <RadioGroupItem value={item.value} id={item.value} />
          <Label htmlFor={item.value}>{item.label}</Label>
        </div>
      ))}
    </RadioGroup>
  );
}
