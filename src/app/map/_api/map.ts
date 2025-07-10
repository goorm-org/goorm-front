import { api } from "@/lib/api/client";
import { ShortsData } from "@/app/map/_types/map";

export const getShortsList = () => {
  return api.get<ShortsData[]>("/shorts");
};
