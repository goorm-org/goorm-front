import { Button } from "@vapor-ui/core";
import { useRouter } from "next/navigation";

export default function BlankTripPlan() {
  const router = useRouter();
  const onClickAddPlan = () => {
    router.push("/onboarding");
  };
  return (
    <div className="p-[16px] flex flex-col items-center justify-center">
      <div className="text-[#8C8F9F] text-[14px] h-[40px] flex items-center justify-center">
        아직 정해진 여행 일정이 없습니다
      </div>
      <Button size="lg" className="bg-primary-700" onClick={onClickAddPlan}>
        + ADD PLAN
      </Button>
    </div>
  );
}
