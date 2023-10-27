import { DateRangePicker } from "@/components/Calendar/DateRangePicker";
import { addDays, startOfDay } from "date-fns";
import { useState } from "react";

export default function DatePicker() {
  const [range, setRange] = useState({
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
  });

  return (
    <div className="rounded-2xl overflow-hidden">
      <DateRangePicker selectionBorderColor="#444" ranges={[]} />
    </div>
  );
}
