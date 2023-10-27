"use client";

import { CalendarIcon } from "@/components/Icons";
import { useClickOutside } from "@/hooks/hooks";
import { useMemo, useState } from "react";
import dynamic from "next/dynamic";
import { AnimatePresence, motion } from "framer-motion";
import { DateRangePicker } from "@/components/Calendar/DateRangePicker";
import { addDays } from "date-fns";
import { DateRange } from "@/components/Calendar/types";
import { useDateRangeStore } from "@/store/useDateRangeStore";
interface DateProps {
  ranges: DateRange[];
}

const rangeColors: { edgeColor: string; color: string }[] = [
  { edgeColor: "rgba(140, 47, 57, 0.5)", color: "rgba(164, 119, 139, 0.3)" },
  { edgeColor: "rgba(123, 75, 148, 0.5)", color: "rgba(119, 104, 175, 0.2)" },
  { edgeColor: "rgba(240, 93, 35, 0.5)", color: "rgba(240, 93, 35, 0.2)" },
  { edgeColor: "rgba(108, 142, 145, 0.5)", color: "rgba(200, 227, 226, 0.5)" },
];

export function Calendar({ ranges }: DateProps) {
  const [isMenuActive, setIsMenuActive] = useState(false);
  const { dateRange, setDateRange, errorMsg, setErrorMsg } =
    useDateRangeStore();

  const toggleMenu = () => {
    setIsMenuActive((prev) => !prev);
  };

  const setRange = (range: DateRange) => {
    setErrorMsg(null);
    setDateRange(range);
  };

  const styledRanges = useMemo(
    () =>
      ranges.map((range, index) => ({
        ...range,
        ...rangeColors[index % rangeColors.length],
      })),
    [ranges]
  );

  const ref = useClickOutside<HTMLDivElement>(() => setIsMenuActive(false));
  const textRed = errorMsg === null ? "" : "text-red-500";
  return (
    <>
      <div className="lg:relative">
        <motion.button
          animate={{ ...(errorMsg && { scale: [1, 1.2, 1, 1.2, 1] }) }}
          aria-label="Check in"
          className={`flex items-center p-4 ${textRed}`}
          onClick={toggleMenu}
        >
          <CalendarIcon className="mr-1 w-6" />
          <p className="text-sm truncate hidden lg:block">Date</p>
        </motion.button>
        <AnimatePresence>
          {isMenuActive && (
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              exit={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="absolute border-slate-200 -left-2 top-[120%] rounded-2xl px-2 py-4 bg-white shadow-md flex justify-center z-30"
              ref={ref}
              style={{ width: "fit-content" }}
            >
              <DateRangePicker
                onRangeSelect={setRange}
                selectedRange={dateRange}
                disablePast={true}
                selectionBorderColor="#0f766e"
                className="text-black font-bold"
                ranges={styledRanges}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}

const DatePicker = dynamic(() => import("./DatePicker"), {
  loading: () => <p className="">Loading...</p>,
});
