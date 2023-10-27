import { addDays, addYears, startOfDay } from "date-fns";
import { DateRangePicker } from "../Calendar/DateRangePicker";
import { MenuLayoutProps } from "@/lib/types/MenuLayoutProps";
import { ProfileOptionsLayout } from "@/lib/types/ProfileOptiopnsLayouts";
export function ScheduleMenuLayout({}: MenuLayoutProps<ProfileOptionsLayout>) {
  return (
    <div className=" items-center justify-center py-2">
      <DateRangePicker
        selectionBorderColor="#435344"
        ranges={[
          {
            start: addDays(startOfDay(new Date()), 1),
            end: addDays(startOfDay(new Date()), 5),
            color: "#16a34a",
            edgeColor: "#166534",
          },
          {
            start: addDays(startOfDay(new Date()), 4),
            end: addDays(startOfDay(new Date()), 7),
            color: "#b91c1c",
            edgeColor: "#7f1d1d",
          },
          {
            start: addDays(startOfDay(new Date()), 21),
            end: addDays(startOfDay(new Date()), 26),
            color: "#b91c1c",
            edgeColor: "#7f1d1d",
          },
        ]}
      />
    </div>
  );
}
