"use client";

import {
  addDays,
  getDate,
  isAfter,
  isBefore,
  isSameDay,
  isSameMonth,
  isToday,
  isWithinInterval,
  startOfDay,
  startOfToday,
} from "date-fns";
import { ButtonHTMLAttributes, CSSProperties, DetailedHTMLProps } from "react";
import {
  DateRange,
  IDayInfo,
  RangeDateButtonProps,
  StyledDateRange,
} from "./types";

const getRangeViewerDayStyle = (
  day: Date,
  dayInfo: IDayInfo,
  currentMonth: Date,
  ranges: StyledDateRange[],
  range: StyledDateRange | null,
  selectedRange: DateRange | null,
  rangesInteractiveOnly: boolean,
  separateBorders: boolean,
  selectionBorderColor: string = "lime",
  disablePast: boolean = false
) => {
  const isDayToday = isToday(day) ? "font-black" : "";
  const disabledBtn =
    !isSameMonth(day, currentMonth) ||
    (disablePast && !isBefore(startOfDay(addDays(new Date(), -1)), day))
      ? "text-current opacity-50"
      : "brightness-125";
  const isRangeEnd = range && isSameDay(day, range.end);
  const isRangeStart = range && isSameDay(day, range.start);
  const isInRange = range && isWithinInterval(day, range);
  // z0
  const z0Style: CSSProperties = {
    backgroundColor:
      dayInfo.endInsideRange !== null
        ? ranges[dayInfo.endInsideRange].color
        : dayInfo.startInsideRange !== null
        ? ranges[dayInfo.startInsideRange].color
        : "",
  };
  const z0ClassName = !rangesInteractiveOnly
    ? !disablePast || !isAfter(startOfToday(), day)
      ? "hover:cursor-pointer"
      : "hover:cursor-not-allowed"
    : `${isInRange ? "cursor-pointer" : "cursor-auto"}`;
  const z1Style: CSSProperties = {
    backgroundColor:
      isRangeEnd || isRangeStart
        ? range.edgeColor
        : dayInfo.endInsideRange !== null
        ? ranges[dayInfo.endInsideRange].edgeColor
        : dayInfo.startInsideRange !== null
        ? ranges[dayInfo.startInsideRange].edgeColor
        : isInRange
        ? range.color
        : "",
  };

  // z1
  const rangeStart = isRangeStart ? "rounded-l-full" : "";
  const rangeEnd = isRangeEnd ? "rounded-r-full" : "";
  const z1ClassName = `${rangeStart} ${rangeEnd}`;

  const isSelected = selectedRange && isWithinInterval(day, selectedRange);
  const isSelectionEnd = selectedRange && isSameDay(selectedRange.end, day);
  const isSelectionStart = selectedRange && isSameDay(selectedRange.start, day);
  const z2ClassName = !separateBorders
    ? `border-y-2 ${
        isSelectionEnd ? "rounded-r-full border-r-2 border-current" : ""
      } 
      ${isSelectionStart ? "rounded-l-full border-l-2 border-current" : ""} 
                                          ${
                                            isSelected
                                              ? "border-current"
                                              : "border-transparent"
                                          }`
    : `rounded-full border-2  ${isSelected ? "" : "border-transparent"}`;

  return {
    z0Style: z0Style,
    z1Style: z1Style,
    z2Style: {
      borderColor: isSelected ? selectionBorderColor : "transparent",
    } as CSSProperties,
    z0ClassName: z0ClassName,
    z1ClassName: z1ClassName,
    z2ClassName: `${disabledBtn} ${z2ClassName} ${isDayToday}`,
  };
};

export function RangePickerDayButton({
  day,
  dayInfo,
  currentRangeIndex,
  currentMonth,
  selectedRange,
  selectionBorderColor,
  separateBorders = false,
  rangesInteractiveOnly = false,
  ranges,
  disablePast,
  ...props
}: RangeDateButtonProps) {
  const range = currentRangeIndex !== null ? ranges[currentRangeIndex] : null;

  const { z0ClassName, z0Style, z1ClassName, z1Style, z2ClassName, z2Style } =
    getRangeViewerDayStyle(
      day,
      dayInfo,
      currentMonth,
      ranges,
      range,
      selectedRange,
      rangesInteractiveOnly,
      separateBorders,
      selectionBorderColor,
      disablePast
    );

  return (
    <button
      {...props}
      className={`relative min-h-[2rem] ${z0ClassName}`}
      style={z0Style}
    >
      <span
        style={z1Style}
        className={`${z1ClassName} absolute h-full top-0 left-0 flex items-center justify-center w-full`}
      ></span>

      <span
        style={z2Style}
        className={`${z2ClassName}  absolute w-full h-full inset-0 m-auto flex items-center justify-center`}
      >
        {getDate(day)}
      </span>
    </button>
  );
}
