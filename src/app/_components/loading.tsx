import ReactLottie from "react-lottie";
import animationData from "@/app/_assets/lottie/loading.json";

export default function Loading() {
  return (
    <div className="fixed top-0 left-0 w-full h-dvh flex items-center justify-center bg-[#E5E5EA] z-500">
      <ReactLottie options={{ animationData: animationData }} />
    </div>
  );
}
