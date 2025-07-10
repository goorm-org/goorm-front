import CheckboxButtonGroup from "@/app/_components/checkbox-button-group";
import { Badge, Button, Card } from "@vapor-ui/core";
import dayjs from "dayjs";
import { useRouter } from "next/navigation";
import { useState } from "react";

export interface SelectTripDateProps {
  startDate: string;
  endDate: string;
  diffDays: number;
  selectedItems: number[];
}

export default function SelectTripDate({
  startDate,
  endDate,
  diffDays,
  selectedItems,
}: SelectTripDateProps) {
  const router = useRouter();
  const [selectedDate, setSelectedDate] = useState<number>(0);

  return (
    <div>
      <div className="p-[16px]">
        <div className="flex items-center gap-[10px]">
          <div className="text-[20px] font-bold leading-[30px]">Jeju Trip</div>
          <Badge
            size="sm"
            className="bg-white rounded-full border border-primary-700"
          >
            <div className="text-primary-700">
              {startDate} - {endDate}
            </div>
          </Badge>
        </div>
        <div className="mt-[8px]">
          <CheckboxButtonGroup
            className="w-full !flex-nowrap overflow-x-auto scrollbar-hide [&::-webkit-scrollbar]:hidden"
            options={Array.from({ length: diffDays + 1 }, (_, i) => ({
              label: `Day${i + 1}`,
              value: i,
            }))}
            selectedValues={[selectedDate]}
            onSelect={(value) => {
              setSelectedDate(value as number);
            }}
          />
        </div>
      </div>
      <div className="w-full h-[16px] bg-[#F2F2F7]" />
      <Card.Root>
        <Card.Footer>
          <Button
            className="bg-primary-700"
            size="xl"
            stretch
            onClick={() => {
              const params = new URLSearchParams();
              params.set(
                "date",
                dayjs(startDate).add(selectedDate, "day").format("YYYY-MM-DD")
              );
              params.set("placeIds", selectedItems.join(","));
              router.push(`/plan?${params.toString()}`);
            }}
          >
            ADD TO PLAN
          </Button>
        </Card.Footer>
      </Card.Root>
    </div>
  );
}
