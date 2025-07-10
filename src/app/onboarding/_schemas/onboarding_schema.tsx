import { z } from "zod";

export const onboardingSchema = z.object({
  departure_date: z.string().min(1),
  arrival_date: z.string().min(1),
  location_filter_options: z.array(z.string()).min(1),
  category_filter_options: z.array(z.string()).min(1),
});

export type OnboardingSchema = z.infer<typeof onboardingSchema>;

export const defaultValues: OnboardingSchema = {
  departure_date: "",
  arrival_date: "",
  location_filter_options: [],
  category_filter_options: [],
};
