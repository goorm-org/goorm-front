"use client";

import { useEffect, useState } from "react";
import { DateRange } from "react-day-picker";
import { Calendar } from "@/app/_components/calendar";
import DatePickerInput from "@/app/_components/date-picker-input";
import { Button, Dialog } from "@vapor-ui/core";
import dayjs from "dayjs";

export interface Step01DateRangeProps {
  onSelect: (date: DateRange) => void;
  inputSelectedRange: DateRange | undefined;
}

export default function Step01DateRange({
  onSelect,
  inputSelectedRange,
}: Step01DateRangeProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [calenderSelectedRange, setCalenderSelectedRange] = useState<
    DateRange | undefined
  >(inputSelectedRange);

  const onClickOk = () => {
    if (calenderSelectedRange) {
      onSelect(calenderSelectedRange);
    }
    setIsOpen(false);
  };

  useEffect(() => {
    if (inputSelectedRange) {
      setCalenderSelectedRange(inputSelectedRange);
    }
  }, [inputSelectedRange, isOpen]);

  return (
    <div className="flex items-center gap-[8px]">
      <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
        <Dialog.Trigger asChild>
          <button>
            <DatePickerInput
              label="Departure Date"
              placeholder="25.07.11"
              value={
                inputSelectedRange?.from
                  ? dayjs(inputSelectedRange?.from).format("YY.MM.DD")
                  : ""
              }
            />
          </button>
        </Dialog.Trigger>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="15"
          height="62"
          viewBox="0 0 15 62"
          fill="none"
        >
          <path d="M3.96191 46.9858H12.0389" stroke="black" />
        </svg>
        <Dialog.Trigger asChild>
          <button>
            <DatePickerInput
              label="Arrival Date"
              placeholder="25.07.18"
              value={
                inputSelectedRange?.to
                  ? dayjs(inputSelectedRange?.to).format("YY.MM.DD")
                  : ""
              }
            />
          </button>
        </Dialog.Trigger>
        <Dialog.CombinedContent className="w-[307px]">
          <Dialog.Header>
            <Dialog.Title>Select Date</Dialog.Title>
          </Dialog.Header>
          <Dialog.Body>
            <Calendar
              mode="range"
              className="rounded-lg border"
              selected={calenderSelectedRange}
              onSelect={setCalenderSelectedRange}
            />
          </Dialog.Body>
          <Dialog.Footer style={{ marginLeft: "auto" }}>
            <div className="ml-auto">
              <Dialog.Close asChild>
                <Button size="lg" variant="ghost" className="text-[#3E404C]">
                  Cancel
                </Button>
              </Dialog.Close>
              <Button size="lg" className="bg-primary-700" onClick={onClickOk}>
                Ok
              </Button>
            </div>
          </Dialog.Footer>
        </Dialog.CombinedContent>
      </Dialog.Root>
    </div>
  );
}
