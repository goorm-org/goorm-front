import { getOnboardingInfo } from "@/app/onboarding/_apis/onboarding.api";
import useSWR from "swr";

const fetcher = async () => {
  const { data } = await getOnboardingInfo();
  return data;
};

const useOnboardingInfo = () => {
  const { data, isLoading, error } = useSWR("/onboardings", fetcher);

  return { data, isLoading, error };
};

export default useOnboardingInfo;
