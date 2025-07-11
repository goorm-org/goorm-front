/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import { useRef, useState, useEffect } from "react";
import useSWR from "swr";
import { getTripList } from "./_apis/plan";
// import { useSearchParams } from "next/navigation";
import Slider from "react-slick";
import PlanHeader from "@/app/plan/_components/plan-header";
import { Badge, Button } from "@vapor-ui/core";
import PlanMap from "@/app/plan/_components/plan-map";
import TrafficBadge from "@/app/plan/_components/traffic-badge";
import Image from "next/image";
import clsx from "clsx";

export default function Plan() {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [tripList, setTripList] = useState<any>(null);
  let sliderRef = useRef<Slider | null>(null);

  // const searchParams = useSearchParams();

  const { data } = useSWR("getTripList", () =>
    getTripList({
      // date: searchParams.get("date"),
      // placeIds: [Number(searchParams.get("placeIds"))],
      date: "2025-07-05",
      placeIds: [5, 4, 2],
    })
  );

  useEffect(() => {
    if (data) {
      // 메인 데이터 중복 제거
      const uniqueData = Array.isArray(data.data)
        ? (data.data as any[]).filter(
            (item: any, idx: number, arr: any[]) =>
              arr.findIndex((v: any) => v.id === item.id) === idx
          )
        : data.data;

      // 각 place의 recommendations 중복도 제거
      const processedData = (uniqueData as any[]).map((place: any) => ({
        ...place,
        recommendations: Array.isArray(place.recommendations)
          ? (place.recommendations as any[]).filter(
              (rec: any, idx: number, arr: any[]) =>
                arr.findIndex((v: any) => v.id === rec.id) === idx
            )
          : place.recommendations,
      }));

      setTripList({
        ...data,
        data: processedData,
      });
    }
  }, [data]);

  if (tripList) console.log("tripList", tripList);

  // 유튜브 URL에서 비디오 ID 추출
  const getYouTubeVideoId = (url: string) => {
    const videoIdMatch = url.match(
      /(?:youtube\.com\/shorts\/|youtu\.be\/|youtube\.com\/watch\?v=)([^&\n?#]+)/
    );
    return videoIdMatch ? videoIdMatch[1] : null;
  };

  // 유튜브 썸네일 URL 생성
  const getYouTubeThumbnail = (url: string) => {
    const videoId = getYouTubeVideoId(url);
    return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
  };

  // interface Recommendation {
  //   title: string;
  //   categoryHigh: string;
  //   address: string;
  //   shortsUrl: string;
  //   latitude: number;
  //   longitude: number;
  // }

  // const recommendations: {
  //   placeName: string;
  //   categoryHigh: string;
  //   address: string;
  //   shortsUrl: string;
  //   latitude: number;
  //   longitude: number;
  // }[] = [];

  // if (
  //   tripList &&
  //   Array.isArray(tripList) &&
  //   tripList[0] &&
  //   Array.isArray(tripList[0].recommendations)
  // ) {
  //   recommendations =
  //     (tripList.ta[0].recommendations as Recommendation[]).map(
  //       ({ title, categoryHigh, address, shortsUrl, latitude, longitude }) => ({
  //         placeName: title,
  //         categoryHigh,
  //         address,
  //         shortsUrl,
  //         latitude,
  //         longitude,
  //       })
  //     ) || [];
  // }

  const next = () => {
    sliderRef.current?.slickNext();
    const length =
      tripList && Array.isArray(tripList) ? (tripList as unknown[]).length : 0;
    setCurrentIdx((prev) =>
      length > 0 ? (prev === length - 1 ? 0 : prev + 1) : 0
    );
  };

  const previous = () => {
    sliderRef.current?.slickPrev();
    const length = Array.isArray(tripList) ? (tripList as unknown[]).length : 0;
    setCurrentIdx((prev) =>
      length > 0 ? (prev === 0 ? length - 1 : prev - 1) : 0
    );
  };

  return (
    <div className="h-dvh">
      <PlanHeader />

      <div className="h-[calc(100dvh_-_64px)] overflow-y-auto scroll-hidden">
        <section className="px-4">
          <section className="w-full h-[148px] rounded-[8px] bg-secondary-500 relative px-4 py-5">
            <span className="absolute top-5 right-4 text-white opacity-50 font-bold text-sm">
              JEJUGO
            </span>
            <ul className="flex flex-col justify-between h-full">
              <li className="flex flex-col">
                <span className="text-white opacity-50 text-sm">
                  JEJU TRIP NAME
                </span>
                <span className="font-bold text-white text-xl">JEJU TRIP</span>
              </li>
              <li className="flex flex-col">
                <span className="text-white opacity-50 text-sm">DATE</span>
                <span className="text-sm text-white font-medium">
                  2025.07.11 - 2025.07.18
                </span>
              </li>
            </ul>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="109"
              height="84"
              viewBox="0 0 109 84"
              fill="none"
              className="absolute bottom-0 right-0"
            >
              <rect
                x="48.9082"
                y="24.4478"
                width="67.968"
                height="67.968"
                rx="33.984"
                fill="url(#paint0_linear_84_10873)"
              />
              <rect
                width="67.968"
                height="67.968"
                rx="33.984"
                transform="matrix(1 0 0 -1 0.490234 67.9653)"
                fill="url(#paint1_linear_84_10873)"
              />
              <defs>
                <linearGradient
                  id="paint0_linear_84_10873"
                  x1="82.8922"
                  y1="24.4478"
                  x2="82.8922"
                  y2="92.4157"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="white" stopOpacity="0.3" />
                  <stop offset="1" stopColor="white" stopOpacity="0" />
                </linearGradient>
                <linearGradient
                  id="paint1_linear_84_10873"
                  x1="33.984"
                  y1="0"
                  x2="33.984"
                  y2="67.968"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="white" stopOpacity="0.3" />
                  <stop offset="1" stopColor="white" stopOpacity="0" />
                </linearGradient>
              </defs>
            </svg>
          </section>
        </section>

        <section className="flex flex-col p-4 mx-4 mb-4 border rounded-[8px] gap-2">
          <div className="flex items-center gap-3 mx-auto">
            <Button
              variant="ghost"
              className="cursor-pointer"
              onClick={previous}
            >
              <span className="sr-only">Previous</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="17"
                height="16"
                viewBox="0 0 17 16"
                fill="none"
              >
                <path
                  d="M10.2315 11.0877C10.4853 11.3415 10.4853 11.7531 10.2315 12.0069C9.97765 12.2607 9.5661 12.2607 9.31226 12.0069L5.8395 8.53414C5.54297 8.23762 5.54297 7.75685 5.8395 7.46031L9.31226 3.98756C9.5661 3.73372 9.97765 3.73372 10.2315 3.98756C10.4853 4.2414 10.4853 4.65296 10.2315 4.9068L7.14107 7.99723L10.2315 11.0877Z"
                  fill={currentIdx === 0 ? "#E1E1E8" : "#525463"}
                />
              </svg>
            </Button>
            <div className="flex gap-3 items-center">
              <span className="font-bold text-lg text-gray-800">
                Day {currentIdx + 1}
              </span>
              <span className="text-gray-500 text-sm">07.05/Sat</span>
            </div>
            <Button variant="ghost" className="cursor-pointer" onClick={next}>
              <span className="sr-only">Next</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="17"
                height="16"
                viewBox="0 0 17 16"
                fill="none"
              >
                <path
                  d="M5.80757 11.0877C5.55373 11.3415 5.55373 11.7531 5.80757 12.0069C6.06141 12.2607 6.47297 12.2607 6.72681 12.0069L10.1996 8.53414C10.4961 8.23762 10.4961 7.75685 10.1996 7.46031L6.72681 3.98756C6.47297 3.73372 6.06141 3.73372 5.80757 3.98756C5.55373 4.2414 5.55373 4.65296 5.80757 4.9068L8.898 7.99723L5.80757 11.0877Z"
                  fill={
                    Array.isArray(tripList) &&
                    (tripList as unknown[]).length > 0 &&
                    currentIdx === (tripList as unknown[]).length - 1
                      ? "#E1E1E8"
                      : "#525463"
                  }
                />
              </svg>
            </Button>
          </div>
          <Slider
            ref={(slider) => {
              // @ts-expect-error: slider is not defined
              sliderRef = slider;
            }}
            dots={false}
            infinite={false}
            speed={500}
            slidesToShow={1}
            slidesToScroll={1}
            arrows={false}
          >
            <PlanMap
              width="100%"
              height="200px"
              zoom={13}
              locations={
                tripList?.data?.map((place: any) => ({
                  placeName: place.title,
                  categoryHigh: place.categoryHigh,
                  address: place.address,
                  latitude: place.latitude,
                  longitude: place.longitude,
                })) || []
              }
            />
          </Slider>
          <ul className="relative flex flex-col w-full mt-4 gap-7">
            {tripList?.data?.map((place: any, idx: number) => (
              <li key={place.id}>
                <div className="flex gap-4 items-center">
                  <span className="w-9 h-9 rounded-full bg-secondary-600 text-white text-center leading-9 font-bold z-1">
                    {idx + 1}
                  </span>
                  <Image
                    src={getYouTubeThumbnail(place.shortsUrl || "")}
                    width={64}
                    height={64}
                    alt="place image"
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div>
                    <span className="font-bold text-lg">{place.title}</span>
                    <div className="flex gap-2 items-center mt-2">
                      <Badge
                        className="bg-secondary-50 text-secondary-600"
                        shape="pill"
                      >
                        {place.categoryHigh}
                      </Badge>
                      <span className="text-secondary-600 font-medium text-xs">
                        {place.openingHours?.[0] || "-"}
                      </span>
                    </div>
                  </div>
                </div>
                {/* AI 추천 장소가 있을 경우 */}
                {Array.isArray(place.recommendations) &&
                  place.recommendations.length > 0 && (
                    <div className="ml-13">
                      <span className="text-gray-500 text-sm pl-1 pb-3 pt-6 block">
                        AI Recommended Spots
                      </span>
                      <ul>
                        {[
                          place.recommendations[0],
                          place.recommendations[2],
                        ].map((rec: any, idx: number) => (
                          <li
                            className={clsx(
                              "flex gap-4 items-center",
                              idx === 1 && "mt-4"
                            )}
                            key={rec.id}
                          >
                            <Image
                              src={getYouTubeThumbnail(rec.shortsUrl || "")}
                              width={64}
                              height={64}
                              alt="place image"
                              className="w-16 h-16 rounded-full object-cover"
                            />
                            <div>
                              <span className="font-bold text-lg">
                                {rec.title}
                              </span>
                              <div className="flex gap-2 items-center mt-2">
                                <Badge
                                  shape="pill"
                                  className="p-2 bg-primary-50 text-primary-700"
                                >
                                  {rec.categoryHigh}
                                </Badge>
                                <TrafficBadge
                                  trafficStatus={
                                    rec.congestionDegree === 3
                                      ? "high"
                                      : rec.congestionDegree === 1
                                      ? "low"
                                      : "middle"
                                  }
                                />
                              </div>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}
