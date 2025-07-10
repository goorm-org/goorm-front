import { api } from "@/lib/api/client";

export interface PostOnboardingInfoDTO {
  vibeList: number[];
  placeCategoryList: number[];
  from: string;
  to: string;
}

export const postOnboardingInfo = (data: PostOnboardingInfoDTO) =>
  api.post("/onboardings", data);
