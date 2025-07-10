import useSWR from "swr";
// import { getShorts } from "../_apis/explore.api";
import {
  deleteShortBookmark,
  getShorts,
  postShortBookmark,
} from "../_apis/explore.api";

const fetcher = async () => {
  const { data } = await getShorts();
  return data;
};

const useShorts = () => {
  const { data, isLoading, error, mutate } = useSWR("/api/shorts", () =>
    fetcher()
  );

  const handleToggleBookmark = (id: number) => {
    try {
      const isBookmarked = data?.find((item) => item.id === id)?.isBookmarked;
      if (isBookmarked) {
        deleteShortBookmark(id);
      } else {
        postShortBookmark(id);
      }
      const newData = data?.map((item) =>
        item.id === id ? { ...item, isBookmarked: !item.isBookmarked } : item
      );

      mutate(newData, false);
    } catch (error) {
      console.error(error);
      mutate(data, false);
    }
  };

  return { data, isLoading, error, handleToggleBookmark, mutate };
};

export default useShorts;
