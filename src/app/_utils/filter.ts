import {
  ONBOARDING_DATA_KEY,
  PLACE_FILTER_DATA_KEY,
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

/** place filter data */
export const getPlaceFilterDataFromSessionStorage = () => {
  const filterData = sessionStorage.getItem(PLACE_FILTER_DATA_KEY);
  return filterData ? (JSON.parse(filterData) as string[]) : null;
};

export const setPlaceFilterDataToSessionStorage = (data: string[]) => {
  sessionStorage.setItem(PLACE_FILTER_DATA_KEY, JSON.stringify(data));
};

export const updatePlaceFilterDataToSessionStorage = (
  data: Partial<string[]>
) => {
  const prevFilterData = getPlaceFilterDataFromSessionStorage();
  if (!prevFilterData) return;
  sessionStorage.setItem(
    PLACE_FILTER_DATA_KEY,
    JSON.stringify({ ...prevFilterData, ...data })
  );
};
