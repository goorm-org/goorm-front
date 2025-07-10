import useSWR from "swr";
import { getBookmarks } from "../_apis/saved.api";
import { deleteShortBookmark } from "@/app/explore/_apis/explore.api";

const fetcher = async () => {
  const { data } = await getBookmarks();
  return data;
};

const useSavedPlaceList = () => {
  const { data, mutate } = useSWR("/api/saved-place-list", fetcher);

  const deleteBookmarks = async (ids: number[]) => {
    await deleteShortBookmark(ids);
    mutate();
  };

  return { data, deleteBookmarks };
};

export default useSavedPlaceList;
