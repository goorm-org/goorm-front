import {
  ONBOARDING_DATA_KEY,
  PLACE_FILTER_DATA_KEY,
} from "../_constants/local-storage-key";
import { OnboardingSchema } from "../onboarding/_schemas/onboarding_schema";

/** onboarding data */
export const getOnboardingDataFromLocalStorage = () => {
  const filterData = localStorage.getItem(ONBOARDING_DATA_KEY);
  return filterData ? (JSON.parse(filterData) as OnboardingSchema) : null;
};

export const setOnboardingDataToLocalStorage = (data: OnboardingSchema) => {
  localStorage.setItem(ONBOARDING_DATA_KEY, JSON.stringify(data));
};

export const updateOnboardingDataToLocalStorage = (
  data: Partial<OnboardingSchema>
) => {
  const prevFilterData = getOnboardingDataFromLocalStorage();
  if (!prevFilterData) return;
  localStorage.setItem(
    ONBOARDING_DATA_KEY,
    JSON.stringify({ ...prevFilterData, ...data })
  );
};

/** place filter data */
export const getPlaceFilterDataFromLocalStorage = () => {
  const filterData = localStorage.getItem(PLACE_FILTER_DATA_KEY);
  return filterData ? (JSON.parse(filterData) as string[]) : null;
};

export const setPlaceFilterDataToLocalStorage = (data: string[]) => {
  localStorage.setItem(PLACE_FILTER_DATA_KEY, JSON.stringify(data));
};

export const updatePlaceFilterDataToLocalStorage = (
  data: Partial<string[]>
) => {
  const prevFilterData = getPlaceFilterDataFromLocalStorage();
  if (!prevFilterData) return;
  localStorage.setItem(
    PLACE_FILTER_DATA_KEY,
    JSON.stringify({ ...prevFilterData, ...data })
  );
};
