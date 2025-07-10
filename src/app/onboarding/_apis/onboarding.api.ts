import { api } from "@/lib/api/client";

export interface PostOnboardingInfoDTO {
  vibeList: number[];
  placeCategoryList: number[];
  from: string;
  to: string;
}

export const postOnboardingInfo = (data: PostOnboardingInfoDTO) =>
  api.post("/onboardings", data);

export interface GetOnboardingInfoResponse {
  id: number;
  from: string;
  to: string;
  vibeList: number[];
  placeCategoryList: number[];
}

export const getOnboardingInfo = () =>
  api.get<GetOnboardingInfoResponse>("/onboardings");

export type PatchOnboardingInfoDTO = Partial<PostOnboardingInfoDTO>;

export const patchOnboardingInfo = (data: PatchOnboardingInfoDTO) =>
  api.patch("/onboardings", data);
