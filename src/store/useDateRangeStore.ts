import { DateRange } from "@/components/Calendar/types";
import { create } from "zustand";

interface DateRangeStoreProps {
  dateRange: DateRange | null;
  setDateRange: (rng: DateRange) => void;
  errorMsg: string | null;
  setErrorMsg: (errMsg: string | null) => void;
}

export const useDateRangeStore = create<DateRangeStoreProps>((set) => ({
  dateRange: null,
  errorMsg: null,
  setErrorMsg: (err: string | null) => set(() => ({ errorMsg: err })),
  setDateRange: (loc: DateRange) => set(() => ({ dateRange: loc })),
}));
