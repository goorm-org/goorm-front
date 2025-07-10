import useSWR from "swr";
import { getBookmarks } from "../_apis/saved.api";

const fetcher = async () => {
  const { data } = await getBookmarks();
  return data;
};

const useSavedPlaceList = () => {
  const { data } = useSWR("/api/saved-place-list", fetcher);
  return { data };
};

export default useSavedPlaceList;
