import { api } from "@/lib/api/client";
import { SavedPlace } from "./saved.interface";

export type GetBookmarksResponse = SavedPlace[];

export const getBookmarks = async () =>
  await api.get<GetBookmarksResponse>("/bookmarks");
