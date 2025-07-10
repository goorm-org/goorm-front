import useSWR from "swr";
// import { getShorts } from "../_apis/explore.api";
import { ShortsPlace } from "../_apis/explore.interface";

const mockData: ShortsPlace[] = [
  {
    id: 1,
    name: "제주도 쇼츠 추천 장소 1",
    address: "제주특별자치도 제주시 한림읍 1",
    category: {
      high: "관광지",
      middle: ["오름", "포토스팟 1"],
      low: ["일몰 명소"],
    },
    openingHours: [0, 24],
    phoneNumber: "064-789-1231",
    congestionDegreeList: [
      {
        population: 36,
        time: "2025-07-10T11:21:05.368Z",
        degree: 1,
      },
      {
        population: 76,
        time: "2025-07-10T11:21:05.368Z",
        degree: 2,
      },
    ],
    details: {
      pricePerPerson: [0, 10000],
      averagePrice: 5000,
      averageRating: 4.6,
      shortsUrl: "https://www.youtube.com/shorts/ZVJCFwy_B1Q",
    },
    isBookmarked: false,
  },
  {
    id: 2,
    name: "제주도 쇼츠 추천 장소 2",
    address: "제주특별자치도 제주시 한림읍 2",
    category: {
      high: "관광지",
      middle: ["오름", "포토스팟 2"],
      low: ["일몰 명소"],
    },
    openingHours: [0, 24],
    phoneNumber: "064-789-1232",
    congestionDegreeList: [
      {
        population: 25,
        time: "2025-07-10T11:21:05.368Z",
        degree: 1,
      },
      {
        population: 90,
        time: "2025-07-10T11:21:05.368Z",
        degree: 2,
      },
    ],
    details: {
      pricePerPerson: [0, 10000],
      averagePrice: 5000,
      averageRating: 4.7,
      shortsUrl: "https://youtube.com/shorts/rFv-lRbbGoA",
    },
    isBookmarked: true,
  },
  {
    id: 3,
    name: "제주도 쇼츠 추천 장소 3",
    address: "제주특별자치도 제주시 한림읍 3",
    category: {
      high: "관광지",
      middle: ["오름", "포토스팟 3"],
      low: ["일몰 명소"],
    },
    openingHours: [0, 24],
    phoneNumber: "064-789-1233",
    congestionDegreeList: [
      {
        population: 20,
        time: "2025-07-10T11:21:05.368Z",
        degree: 1,
      },
      {
        population: 97,
        time: "2025-07-10T11:21:05.368Z",
        degree: 2,
      },
    ],
    details: {
      pricePerPerson: [0, 10000],
      averagePrice: 5000,
      averageRating: 4.8,
      shortsUrl: "https://youtube.com/shorts/BVIZIAlWYk0?si=TgeZ03Ah8FWMsKKc-3",
    },
    isBookmarked: false,
  },
];

const fetcher = async () => {
  // const { data } = await getShorts();
  return mockData;
};

const useShorts = () => {
  const { data, isLoading, error, mutate } = useSWR("/api/shorts", fetcher);

  const handleToggleBookmark = (id: number) => {
    //todo: 북마크 api 호출

    const newData = data?.map((item) =>
      item.id === id ? { ...item, isBookmarked: !item.isBookmarked } : item
    );

    mutate(newData, false);
  };

  return { data, isLoading, error, handleToggleBookmark };
};

export default useShorts;
