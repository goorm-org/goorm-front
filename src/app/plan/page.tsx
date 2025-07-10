"use client";

import { useRef, useState } from "react";

import useSWR from "swr";
import { getTripList } from "./_apis/plan";

import Slider from "react-slick";
import PlanHeader from "@/app/plan/_components/plan-header";
import { Badge, Button } from "@vapor-ui/core";
import { MapLocation } from "@/app/map/_types/map";
import PlanMap from "@/app/plan/_components/plan-map";
import TrafficBadge from "@/app/plan/_components/traffic-badge";
// import Image from "next/image";

export default function Plan() {
  const [currentIdx, setCurrentIdx] = useState(0);
  let sliderRef = useRef<Slider | null>(null);

  const { data } = useSWR("getTripList", getTripList);

  const next = () => {
    sliderRef.current?.slickNext();
    setCurrentIdx((prev) => (prev === locations.length - 1 ? 0 : prev + 1));
  };

  const previous = () => {
    sliderRef.current?.slickPrev();
    setCurrentIdx((prev) => (prev === 0 ? locations.length - 1 : prev - 1));
  };

  const locations: MapLocation[] = [
    {
      lat: 33.452651,
      lng: 126.92461,
      address: "서귀포시 성산읍 고성리 224-33",
      description: "광치기해변",
    },
    {
      lat: 33.450206,
      lng: 126.918408,
      address: "서귀포시 성산읍 동류암로 20",
      description: "플레이스 캠프 제주",
    },
    {
      lat: 33.440708,
      lng: 126.898767,
      address: "서귀포시 성산읍 서성일로 1168번길",
      description: "빛의 벙커",
    },
  ];

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
              <span className="text-gray-500 text-sm">07.11/Fri</span>
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
                    currentIdx === locations.length - 1 ? "#E1E1E8" : "#525463"
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
              locations={locations}
            />
          </Slider>
          <ul className="relative flex flex-col w-full mt-4 gap-7">
            <li>
              <div className="flex gap-4 items-center">
                <span className="w-9 h-9 rounded-full bg-secondary-600 text-white text-center leading-9 font-bold z-1">
                  1
                </span>
                {/* <Image
                  // TODO: 임시 이미지
                  src="https://pub-cf3b9667253a490495a16433a99bd7ca.r2.dev/hansol/ico-marker-one.svg"
                  width={64}
                  height={64}
                  alt="place image"
                /> */}
                <div className="w-16 h-16 rounded-full bg-secondary-600" />
                <div>
                  <span className="font-bold text-lg">$PLACE_NAME$</span>
                  <div className="flex gap-2 items-center mt-2">
                    <Badge
                      className="bg-secondary-50 text-secondary-600"
                      shape="pill"
                    >
                      BEST TIME
                    </Badge>
                    <span className="text-secondary-600 font-medium text-xs">
                      10-12AM
                    </span>
                  </div>
                </div>
              </div>
              {/* AI Recommended Spot 있을 경우 */}
              <div className="ml-13">
                <span className="text-gray-500 text-sm pl-1 pb-3 pt-6 block">
                  AI Recommended Spots
                </span>
                <ul>
                  <li className="flex gap-4 items-center">
                    {/* <Image
                    // TODO: 임시 이미지
                    src="https://pub-cf3b9667253a490495a16433a99bd7ca.r2.dev/hansol/ico-marker-one.svg"
                    width={64}
                    height={64}
                    alt="place image"
                  /> */}
                    <div className="w-16 h-16 rounded-full bg-secondary-600" />
                    <div>
                      <span className="font-bold text-lg">$PLACE_NAME$</span>
                      <div className="flex gap-2 items-center mt-2">
                        <Badge
                          shape="pill"
                          className="p-2 bg-primary-50 text-primary-700"
                        >
                          CAFE
                        </Badge>
                        <TrafficBadge trafficStatus="high" />
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </li>
          </ul>
        </section>
      </div>
    </div>
  );
}
