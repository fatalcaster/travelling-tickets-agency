import { isEqual, isSameDay, isToday, isWithinInterval } from "date-fns";

export const isDayInRange = (day: Date, range: DateRange | null) =>
  range && isWithinInterval(day, range);
export const isDayTodayAndNotInRange = (day: Date, range: DateRange | null) =>
  isToday(day) && !isDayInRange(day, range);
export const isDayRangeStart = (day: Date, range: DateRange | null) =>
  (range || false) && (isSameDay(range.start, day) || false);
export const isDayRangeEnd = (day: Date, range: DateRange | null) =>
  (range || false) && (isSameDay(range.end, day) || false);
export const isDayRangeEdge = (day: Date, range: DateRange | null) =>
  isDayRangeEnd(day, range) || isDayRangeStart(day, range);
export const isDayTodayAndInRange = (day: Date, range: DateRange | null) =>
  isToday(day) && isDayInRange(day, range);

export interface DateRange {
  start: Date;
  end: Date;
}
