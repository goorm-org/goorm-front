import { api } from "@/lib/api/client";
import { ShortsPlace } from "./explore.interface";

export type GetShortsResponse = ShortsPlace[];

export const getShorts = () => api.get<GetShortsResponse>("/shorts");

export const postShortBookmark = (id: number) =>
  api.post<{ id: number }>(`/bookmarks/places/${id}`);

export const deleteShortBookmark = (id: number) =>
  api.delete<{ id: number }>(`/bookmarks/${id}`);
