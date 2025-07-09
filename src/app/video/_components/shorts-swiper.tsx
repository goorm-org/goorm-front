"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";

// Swiper 스타일 import
import "swiper/css";
import "swiper/css/pagination";
import { useState } from "react";
import Shorts from "./shorts";
import useShorts from "../_hooks/useShorts";

export default function ShortsSwiper() {
  const { data } = useShorts();
  const [currentPage, setCurrentPage] = useState(0);
  return (
    <div className="w-full h-dvh">
      <Swiper
        direction="vertical"
        modules={[Pagination]}
        onSlideChange={(data) => {
          setCurrentPage(data.activeIndex);
          console.log(data.activeIndex);
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
      </Swiper>
    </div>
  );
}
