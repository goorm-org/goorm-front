import {
  IS_COMPLETED_ONBOARDING_KEY,
  ONBOARDING_DATA_KEY,
} from "../_constants/session-storage-key";
import { OnboardingSchema } from "../onboarding/_schemas/onboarding_schema";

/** onboarding data */
export const getOnboardingDataFromSessionStorage = () => {
  const filterData = sessionStorage.getItem(ONBOARDING_DATA_KEY);
  return filterData ? (JSON.parse(filterData) as OnboardingSchema) : null;
};

export const setOnboardingDataToSessionStorage = (data: OnboardingSchema) => {
  sessionStorage.setItem(ONBOARDING_DATA_KEY, JSON.stringify(data));
};

export const updateOnboardingDataToSessionStorage = (
  data: Partial<OnboardingSchema>
) => {
  const prevFilterData = getOnboardingDataFromSessionStorage();
  if (!prevFilterData) return;
  sessionStorage.setItem(
    ONBOARDING_DATA_KEY,
    JSON.stringify({ ...prevFilterData, ...data })
  );
};

export const setIsCompletedOnboardingToSessionStorage = () => {
  sessionStorage.setItem(IS_COMPLETED_ONBOARDING_KEY, "true");
};

export const getIsCompletedOnboardingFromSessionStorage = () => {
  return sessionStorage.getItem(IS_COMPLETED_ONBOARDING_KEY) === "true";
};
