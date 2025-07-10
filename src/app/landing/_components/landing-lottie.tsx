"use client";

import Lottie from "react-lottie";
import animationData from "@/app/_assets/lottie/landingPage.json";
import LandingFooter from "./landing-footer";

export default function LandingLottie() {
  return (
    <div className="relative">
      <Lottie
        options={{ animationData, loop: true }}
        width={"100%"}
        height={"100%"}
      />
      <div className="absolute bottom-0 w-full">
        <LandingFooter />
      </div>
    </div>
  );
}
