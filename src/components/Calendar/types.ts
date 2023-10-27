import { ButtonHTMLAttributes, DetailedHTMLProps } from "react";

export interface RangeDateButtonProps
  extends DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  disablePast: boolean;
  day: Date;
  dayInfo: IDayInfo;
  currentRangeIndex: number | null;
  ranges: StyledDateRange[];
  currentMonth: Date;
  selectedRange: DateRange | null;
  separateBorders: boolean;
  selectionBorderColor: string;
  rangesInteractiveOnly: boolean;
}

export interface IDayInfo {
  endOf: number | null;
  startOf: number | null;
  startInsideRange: number | null;
  endInsideRange: number | null;
}

export interface DateRange {
  start: Date;
  end: Date;
}
export interface StyledDateRange extends DateRange {
  color: string;
  edgeColor: string;
  key?: string;
}
