import { z } from "zod";

export const onboardingSchema = z.object({
  traveling_with: z.string().min(1),
  departure_date: z.string().min(1),
  arrival_date: z.string().min(1),
  filter_options: z.array(z.string()).min(1),
});

export type OnboardingSchema = z.infer<typeof onboardingSchema>;

export const defaultValues: OnboardingSchema = {
  traveling_with: "",
  departure_date: "",
  arrival_date: "",
  filter_options: [],
};
