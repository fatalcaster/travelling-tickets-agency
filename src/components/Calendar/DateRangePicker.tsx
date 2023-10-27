"use client";

import {
  CalendarHeader,
  WeekDaysLabels,
  useCalendar,
  useDateRanges,
} from "./CalendarParts";
import { RangePickerDayButton } from "./RangePickerDay";
import { DateRange, StyledDateRange } from "./types";

interface DateRangePickerProps {
  className?: string;
  weekStart?: 0 | 2 | 1 | 3 | 4 | 5 | 6 | undefined;
  arrowButtonsClassName?: string;
  ranges?: StyledDateRange[];
  onRangeSelect?: (range: DateRange) => void;
  predefinedRangesOnly?: boolean;
  selectionBorderColor: string;
  disablePast?: boolean;
  selectedRange?: DateRange | null;
}

export function DateRangePicker({
  className,
  arrowButtonsClassName,
  ranges: unsortedRanges = [],
  predefinedRangesOnly = false,
  weekStart = 0,
  selectionBorderColor,
  onRangeSelect,
  disablePast = false,
  selectedRange: initialSelect = null,
}: DateRangePickerProps) {
  const { days, currentMonth, setNextMonth, setPrevMonth } = useCalendar({
    weekStart,
    includeDate: initialSelect?.start,
  });

  const {
    isRangeSelected,
    onMouseEnter,
    selectedRange,
    getRange,
    daysInfo,
    handleRangeSelection,
    ranges,
  } = useDateRanges({
    disablePast: disablePast,
    days: days,
    unsortedRanges,
    onRangeSelect,
    predefinedRangesOnly,
    selectedRange: initialSelect,
  });

  return (
    <div className={`${className ? className : "text-white "}`}>
      <CalendarHeader
        arrowButtonsClassName={arrowButtonsClassName}
        currentMonth={currentMonth}
        setNextMonth={setNextMonth}
        setPrevMonth={setPrevMonth}
      />
      <div className="min-w-[240px] grid gap-y-1 grid-cols-7 box-content">
        <WeekDaysLabels weekStart={weekStart} />
        {days.map((day, index) => {
          const currentDayRangeIndex = getRange(day);
          return (
            <RangePickerDayButton
              disablePast={disablePast}
              selectionBorderColor={selectionBorderColor}
              rangesInteractiveOnly={false}
              separateBorders={!isRangeSelected}
              onMouseEnter={() => onMouseEnter(day)}
              selectedRange={selectedRange}
              currentRangeIndex={currentDayRangeIndex}
              dayInfo={daysInfo[index]}
              ranges={ranges}
              day={day}
              key={index}
              onClick={() => handleRangeSelection(day)}
              currentMonth={currentMonth}
            />
          );
        })}
      </div>
    </div>
  );
}
