import CheckboxButtonGroup from "@/app/_components/checkbox-button-group";
import { Badge, Button, Card } from "@vapor-ui/core";
import { useRouter } from "next/navigation";
import { useState } from "react";

export interface SelectTripDateProps {
  startDate: string;
  endDate: string;
  diffDays: number;
}

export default function SelectTripDate({
  startDate,
  endDate,
  diffDays,
}: SelectTripDateProps) {
  const router = useRouter();
  const [selectedDate, setSelectedDate] = useState<string>(startDate);

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
            options={Array.from({ length: diffDays + 1 }, (_, i) => ({
              label: `Day${i + 1}`,
              value: `Day${i + 1}`,
            }))}
            selectedValues={[selectedDate]}
            onSelect={setSelectedDate}
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
              router.push("/plan");
            }}
          >
            ADD TO PLAN
          </Button>
        </Card.Footer>
      </Card.Root>
    </div>
  );
}
