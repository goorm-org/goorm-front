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

  const createBookmark = async (placeId: number) => {
    const { data } = await postShortBookmark(placeId);
    mutate((prev) => {
      return prev?.map((item) =>
        item.id === placeId
          ? { ...item, bookmarks: [...item.bookmarks, { ...data }] }
          : item
      );
    }, false);
  };

  const deleteBookmark = async (placeId: number) => {
    const bookmarkId = data?.find((item) => item.id === placeId)?.bookmarks[0]
      .id;
    if (!bookmarkId) return;
    await deleteShortBookmark(bookmarkId);
    mutate((prev) => {
      return prev?.map((item) =>
        item.id === placeId
          ? {
              ...item,
              bookmarks: item.bookmarks.filter((b) => b.id !== bookmarkId),
            }
          : item
      );
    }, false);
  };

  return {
    data,
    isLoading,
    error,
    mutate,
    createBookmark,
    deleteBookmark,
  };
};

export default useShorts;
