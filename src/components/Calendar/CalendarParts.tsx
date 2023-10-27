"use client";

import {
  addMonths,
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  format,
  isBefore,
  isSameDay,
  isSameMonth,
  isWithinInterval,
  startOfDay,
  startOfMonth,
  startOfToday,
  startOfWeek,
  subMonths,
} from "date-fns";
import { ArrowIcon } from "../Icons";
import { useMemo, useState } from "react";
import { DateRange, IDayInfo, StyledDateRange } from "./types";

export interface CalendarHeaderProps {
  setPrevMonth: () => void;
  setNextMonth: () => void;
  currentMonth: Date;
  arrowButtonsClassName?: string;
}
export function CalendarHeader({
  setNextMonth,
  setPrevMonth,
  arrowButtonsClassName = "",
  currentMonth,
}: CalendarHeaderProps) {
  const defaultArrowButtonClassNames =
    "rounded-full bg-inherit brightness-90 p-1 hover:brightness-125";
  return (
    <div className="flex justify-between mb-2 ">
      <button
        className={`${defaultArrowButtonClassNames} ${arrowButtonsClassName} `}
        onClick={setPrevMonth}
      >
        <ArrowIcon direction="left" className="w-4" />
      </button>

      <p className=" text-lg text-center">
        <span className="font-bold mr-3">{`${format(
          currentMonth,
          "LLLL"
        )} `}</span>
        <span>{`${format(currentMonth, "yyyy")}`}</span>
      </p>
      <button
        className={`${defaultArrowButtonClassNames} ${arrowButtonsClassName}`}
        onClick={setNextMonth}
      >
        <ArrowIcon direction="right" className=" w-4" />
      </button>
    </div>
  );
}
const daysOfWeek = ["S", "M", "T", "W", "T", "F", "S"];

export function WeekDaysLabels({ weekStart }: { weekStart: number }) {
  return (
    <>
      {daysOfWeek.map((_, i) => (
        <span
          key={`week-${i}`}
          className="px-2 text-sm text-neutral-400 relative top-1 text-center"
        >
          {daysOfWeek[(i + weekStart) % 7]}
        </span>
      ))}
    </>
  );
}

export interface UseCalendarProps {
  weekStart?: 0 | 2 | 1 | 3 | 4 | 5 | 6 | undefined;
  includeDate?: Date | null;
}
export function useCalendar({
  weekStart = 0,
  includeDate = null,
}: UseCalendarProps) {
  const today = includeDate ? startOfDay(includeDate) : startOfToday();
  const [currentMonth, setCurrentMonth] = useState(startOfMonth(today));
  const days = useMemo(
    () =>
      eachDayOfInterval({
        start: startOfWeek(startOfMonth(currentMonth), {
          weekStartsOn: weekStart,
        }),
        end: endOfWeek(endOfMonth(currentMonth), { weekStartsOn: weekStart }),
      }),
    [currentMonth]
  );

  const setNextMonth = () => {
    setCurrentMonth((prev) => addMonths(prev, 1));
  };
  const setPrevMonth = () => {
    setCurrentMonth((prev) => subMonths(prev, 1));
  };

  return { today, currentMonth, days, setNextMonth, setPrevMonth };
}

const getPredefinedRangeIndex = (day: Date, ranges: DateRange[]) => {
  // if the day is start of a range...
  for (let i = 0; i < ranges.length; i++) {
    if (isSameDay(ranges[i].start, day)) return i;
    if (isBefore(day, ranges[i].start)) break;
  }

  // if a day is end of a range...
  for (let i = 0; i < ranges.length; i++) {
    if (isSameDay(ranges[i].end, day)) return i;
  }

  // if day is contained within an interval
  for (let i = 0; i < ranges.length; i++) {
    const withinInterval = isWithinInterval(day, ranges[i]);
    if (withinInterval) return i;
  }
  return null;
};
function getDayInfo(day: Date, ranges: DateRange[]) {
  let endOf: number | null = null;
  let startOf: number | null = null;
  let startInsideRange: number | null = null;
  let endInsideRange: number | null = null;
  ranges.forEach((range, index) => {
    if (isSameDay(range.start, day)) {
      startOf = index;
      if (
        startInsideRange === null &&
        index > 0 &&
        isWithinInterval(day, ranges[index - 1])
      ) {
        startInsideRange = index - 1;
      }
    }
    if (isSameDay(range.end, day)) {
      endOf = index;

      for (let i = 0; i < Math.max(index + 1, ranges.length); i++) {
        if (i !== index && isWithinInterval(day, ranges[i])) {
          endInsideRange = i;
          break;
        }
      }
    }
  });
  return { endOf, startOf, startInsideRange, endInsideRange } as IDayInfo;
}

export function useDateRanges({
  days,
  unsortedRanges,
  onRangeSelect,
  predefinedRangesOnly,
  disablePast = false,
  selectedRange: initialSelect = null,
}: {
  days: Date[];
  unsortedRanges: StyledDateRange[];
  onRangeSelect?: (range: DateRange) => void;
  predefinedRangesOnly: boolean;
  disablePast: boolean;
  selectedRange: DateRange | null;
}) {
  const [hasSelected, setHasSelected] = useState(false);
  const [selectedRange, setSelectedRange] = useState<DateRange | null>(
    initialSelect
  );
  const [previewRange, setPreviewRange] = useState<DateRange | null>(null);

  const ranges = unsortedRanges
    .map((v) => ({ ...v, start: startOfDay(v.start), end: startOfDay(v.end) }))
    .sort((d1, d2) => (isBefore(d1.start, d2.start) ? -1 : 1));
  const daysInfo = useMemo(() => {
    return days.map((day: Date) => getDayInfo(day, ranges));
  }, [unsortedRanges, days]);

  const handleRangeSelection = (day: Date) => {
    if (predefinedRangesOnly) {
      const rangeIndex = getPredefinedRangeIndex(day, ranges);
      rangeIndex !== null && setSelectedRange(ranges[rangeIndex]);
      onRangeSelect && rangeIndex !== null && onRangeSelect(ranges[rangeIndex]);
      return;
    }
    if (!disablePast || (disablePast && !isBefore(day, startOfToday())))
      select(day);
  };
  const getRange = (day: Date) => getPredefinedRangeIndex(day, ranges);

  const select = (day: Date) => {
    if (!isSameMonth(day, days[Math.floor(days.length / 2)])) return;
    if (!hasSelected) {
      setPreviewRange({ start: day, end: day });
      setHasSelected(true);
      setSelectedRange({ start: day, end: day });
      return;
    }
    if (isBefore(day, previewRange!.start)) {
      setPreviewRange({ start: day, end: day });
      setSelectedRange({ start: day, end: day });
      return;
    }
    setSelectedRange((prev) => {
      onRangeSelect && onRangeSelect({ start: prev!.start, end: day });
      return { start: prev!.start, end: day };
    });
    setPreviewRange(null);
    setHasSelected(false);
  };
  const handlePreview = (day: Date) => {
    if (
      !hasSelected ||
      isBefore(day, previewRange!.start) ||
      !isSameMonth(days[Math.floor(days.length / 2)], day)
    )
      return;

    setPreviewRange((prev) => ({ start: prev!.start, end: day }));
  };

  return {
    onMouseEnter: handlePreview,
    ranges,
    daysInfo,
    getRange,
    handleRangeSelection,
    selectedRange: predefinedRangesOnly
      ? selectedRange
      : previewRange === null
      ? selectedRange
      : previewRange,
    isRangeSelected:
      (predefinedRangesOnly && selectedRange !== null) ||
      (!predefinedRangesOnly &&
        selectedRange !== null &&
        previewRange === null),
  };
}
