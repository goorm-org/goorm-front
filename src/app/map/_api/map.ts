import { api } from "@/lib/api/client";
import { ShortsData } from "@/app/map/_types/map";

export const getShortsList = () => {
  return api.get<ShortsData[]>("/shorts");
};

export const createBookmark = (placeId: number) => {
  return api.post<{ id: number }>(`/bookmarks/places/${placeId}`);
};

export const deleteBookmark = (bookmarkId: number) => {
  return api.delete(`/bookmarks`, {
    data: {
      ids: [bookmarkId],
    },
  });
};
