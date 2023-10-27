// import {
//   addMonths,
//   eachDayOfInterval,
//   endOfMonth,
//   endOfWeek,
//   format,
//   getDate,
//   getDay,
//   getMonth,
//   isBefore,
//   isSameMonth,
//   isWithinInterval,
//   startOfMonth,
//   startOfToday,
//   startOfWeek,
//   subMonths,
// } from "date-fns";
// import { useState } from "react";
// import { ArrowIcon } from "./Icons";
// import {
//   isDayRangeEdge,
//   isDayRangeEnd,
//   isDayRangeStart,
//   isDayTodayAndInRange,
//   isDayTodayAndNotInRange,
// } from "@/lib/utils/date-range-helpers";
// import { DateRange } from "./Calendar/types";

// interface DateRangePickerProps {
//   onSelect?: (range: DateRange) => void;
//   className?: string;
//   arrowButtonsClassName?: string;
// }

// export function DateRangePicker({
//   onSelect,
//   className,
//   arrowButtonsClassName,
// }: DateRangePickerProps) {
//   const today = startOfToday();
//   const [hasSelected, setHasSelected] = useState(false);
//   const [currentMonth, setCurrentMonth] = useState(startOfMonth(today));
//   const [selectionRange, setSelectionRange] = useState<DateRange | null>(null);
//   const [previewRange, setPreviewRange] = useState<DateRange | null>(null);

//   const days = eachDayOfInterval({
//     start: startOfWeek(startOfMonth(currentMonth)),
//     end: endOfWeek(endOfMonth(currentMonth)),
//   });

//   const select = (day: Date) => {
//     if (!isSameMonth(day, currentMonth)) return;
//     if (!hasSelected) {
//       setPreviewRange({ start: day, end: day });
//       setHasSelected(true);
//       setSelectionRange({ start: day, end: day });
//       return;
//     }
//     if (isBefore(day, previewRange!.start)) {
//       setPreviewRange({ start: day, end: day });
//       setSelectionRange({ start: day, end: day });
//       return;
//     }
//     setSelectionRange((prev) => ({ start: prev!.start, end: day }));
//     setPreviewRange(null);
//     setHasSelected(false);
//   };
//   const handlePreview = (day: Date) => {
//     if (
//       !hasSelected ||
//       isBefore(day, previewRange!.start) ||
//       !isSameMonth(currentMonth, day)
//     )
//       return;

//     setPreviewRange((prev) => ({ start: prev!.start, end: day }));
//   };
//   const setNextMonth = () => {
//     setCurrentMonth((prev) => addMonths(prev, 1));
//   };
//   const setPrevMonth = () => {
//     setCurrentMonth((prev) => subMonths(prev, 1));
//   };
//   return (
//     <div className={`${className ? className : "text-white"}`}>
//       <div className="flex justify-between mb-2">
//         <button
//           className={`rounded-full bg-inherit brightness-90 p-1 hover:brightness-125 ${arrowButtonsClassName} `}
//           onClick={setPrevMonth}
//         >
//           <ArrowIcon direction="left" className="w-4" />
//         </button>

//         <p className=" text-lg text-center">
//           <span className="font-bold mr-3">{`${format(
//             currentMonth,
//             "LLLL"
//           )} `}</span>
//           <span>{`${format(currentMonth, "yyyy")}`}</span>
//         </p>
//         <button
//           className={`rounded-full p-1 hover:brightness-125 ${arrowButtonsClassName}`}
//           onClick={setNextMonth}
//         >
//           <ArrowIcon direction="right" className=" w-4" />
//         </button>
//       </div>
//       <div className="min-w-[240px] grid gap-0 grid-cols-7">
//         {days.map((day, index) => (
//           <button
//             onMouseEnter={() => {
//               handlePreview(day);
//             }}
//             onClick={() => select(day)}
//             className={`p-2 text-center ${
//               !isSameMonth(day, currentMonth) && "text-neutral-500"
//             } ${
//               isDayTodayAndNotInRange(day, selectionRange) &&
//               "border-teal-800 border-2 rounded-full"
//             }
//             ${
//               hasSelected &&
//               isWithinInterval(day, previewRange!) &&
//               "bg-teal-400/50 rounded-full"
//             } ${
//               selectionRange &&
//               isWithinInterval(day, selectionRange) &&
//               !isDayRangeEdge(day, selectionRange) &&
//               "bg-teal-400/80"
//             }
//             ${
//               isDayRangeStart(day, selectionRange) &&
//               "bg-teal-500 rounded-l-full"
//             }
//             ${
//               isDayRangeEnd(day, selectionRange) && "bg-teal-500 rounded-r-full"
//             }
//             ${isDayTodayAndInRange(day, selectionRange) && "bg-teal-800"}
//            p-2 my-0.5`}
//             key={index}
//           >
//             {getDate(day)}
//           </button>
//         ))}
//       </div>
//     </div>
//   );
// }
