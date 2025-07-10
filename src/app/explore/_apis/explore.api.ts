import { api } from "@/lib/api/client";
import { ShortsPlace } from "./explore.interface";

export type GetShortsResponse = ShortsPlace[];

export const getShorts = () => api.get<GetShortsResponse>("/shorts");
