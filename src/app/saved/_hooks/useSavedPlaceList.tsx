import useSWR from "swr";

export interface SavedPlace {
  id: string;
  name: string;
  category: string;
  priority: "HIGH" | "MEDIUM" | "LOW";
  image: string;
  isRecommended: boolean;
}

const mockData: SavedPlace[] = [
  {
    id: "1",
    name: "test22",
    category: "test",
    priority: "MEDIUM",
    image: "https://picsum.photos/200/300",
    isRecommended: false,
  },
  {
    id: "2",
    name: "test",
    category: "test",
    priority: "HIGH",
    image: "https://picsum.photos/200/300",
    isRecommended: true,
  },
  {
    id: "3",
    name: "test33",
    category: "test",
    priority: "LOW",
    image: "https://picsum.photos/200/300",
    isRecommended: false,
  },
];

const fetcher = () => {
  return mockData;
};

const useSavedPlaceList = () => {
  const { data } = useSWR("/api/saved-place-list", fetcher);
  return { data };
};

export default useSavedPlaceList;
