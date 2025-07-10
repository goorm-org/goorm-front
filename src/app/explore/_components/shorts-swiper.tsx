"use client";

import { Swiper, SwiperSlide, SwiperRef } from "swiper/react";
import { Pagination } from "swiper/modules";

// Swiper 스타일 import
import "swiper/css";
import "swiper/css/pagination";
import { useRef, useState } from "react";
import Shorts from "./shorts";
import useShorts from "../_hooks/useShorts";
import FilterDrawerButton from "./filter-drawer-button";

export default function ShortsSwiper() {
  const { data, mutate } = useShorts();
  const [currentPage, setCurrentPage] = useState(0);
  const swiperRef = useRef<SwiperRef>(null);
  return (
    <div className="w-full h-dvh">
      <Swiper
        ref={swiperRef}
        direction="vertical"
        modules={[Pagination]}
        onSlideChange={(data) => {
          setCurrentPage(data.activeIndex);
        }}
        className="h-full"
        slidesPerView={1}
        spaceBetween={0}
      >
        {data?.map((item, index) => (
          <SwiperSlide
            key={index}
            className="flex items-center justify-center w-fit bg-black h-screen"
          >
            <Shorts item={item} page={index} currentPage={currentPage} />
          </SwiperSlide>
        ))}
        <div className="absolute top-[16px] right-[50%] translate-x-[50%] z-40">
          <FilterDrawerButton
            onApplyFilter={() => {
              swiperRef.current?.swiper.slideNext();
              mutate();
            }}
          />
        </div>
      </Swiper>
    </div>
  );
}
