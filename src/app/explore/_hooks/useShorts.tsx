import useSWR from "swr";

export interface ShortsData {
  id: string;
  desc: string;
  user: string;
  isBookmarked: boolean;
}

const shorts_data: ShortsData[] = [
  {
    id: "JWPAXulXvh4",
    desc: "Shorts 1",
    user: "user1",
    isBookmarked: false,
  },
  {
    id: "rFv-lRbbGoA",
    desc: "Shorts 2",
    user: "user2",
    isBookmarked: true,
  },
];

const fetcher = () => {
  return shorts_data;
};

const useShorts = () => {
  const { data, isLoading, error, mutate } = useSWR("/api/shorts", fetcher);

  const handleToggleBookmark = (id: string) => {
    //todo: 북마크 api 호출

    const newData = data?.map((item) =>
      item.id === id ? { ...item, isBookmarked: !item.isBookmarked } : item
    );

    mutate(newData, false);
  };

  return { data, isLoading, error, handleToggleBookmark };
};

export default useShorts;
