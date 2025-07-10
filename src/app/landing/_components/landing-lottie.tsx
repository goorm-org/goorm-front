"use client";

import Lottie from "react-lottie";
import animationData from "@/app/_assets/lottie/landingPage.json";
import LandingFooter from "./landing-footer";

export default function LandingLottie() {
  return (
    <div className="relative bg-[#e8e8e8]">
      <Lottie options={{ animationData, loop: true }} height="100dvh" />
      <div className="absolute bottom-0 w-full">
        <LandingFooter />
      </div>
    </div>
  );
}
