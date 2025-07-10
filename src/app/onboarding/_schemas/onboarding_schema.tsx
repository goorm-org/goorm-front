import { z } from "zod";

export const onboardingSchema = z.object({
  departure_date: z.string().min(1),
  arrival_date: z.string().min(1),
  vibeList: z.array(z.number()).min(1),
  placeCategoryList: z.array(z.number()).min(1),
});

export type OnboardingSchema = z.infer<typeof onboardingSchema>;

export const defaultValues: OnboardingSchema = {
  departure_date: "",
  arrival_date: "",
  vibeList: [],
  placeCategoryList: [],
};
