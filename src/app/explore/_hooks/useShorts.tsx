import useSWR from "swr";

export interface ShortsData {
  id: string;
  desc: string;
  name: string;
  time: string;
  score: string;
  isBookmarked: boolean;
}

const shorts_data: ShortsData[] = [
  {
    id: "JWPAXulXvh4",
    desc: "A hidden local café in Jeju with  A hidden local café in Jeju with A hidden local café in Jeju with  A hidden local café in Jeju with ... 1",
    name: "Cafe Haejigae",
    time: "09:00 ~ 21:00",
    score: "4.5",
    isBookmarked: false,
  },
  {
    id: "rFv-lRbbGoA",
    desc: "A hidden local café in Jeju with  A hidden local café in Jeju with A hidden local café in Jeju with  A hidden local café in Jeju with ... 2",
    name: "Cafe Haejigae",
    time: "09:00 ~ 21:00",
    score: "4.5",
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
