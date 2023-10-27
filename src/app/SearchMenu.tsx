"use client";

import Location from "./Location";
import { SearchIcon } from "@/components/Icons";
import { useEffect, useRef } from "react";
import { Calendar } from "./Calendar";
import { Filters } from "./Filters";
import Link from "next/link";
import { useCompanionStore } from "@/store/useCompanionStore";
import { redirect, useRouter } from "next/navigation";
import { addDays } from "date-fns";
import { useTravelPreferencesStore } from "@/store/useTravelPreferencesStore";
import { useLocationStore } from "@/store/useLocationStore";
import { useDateRangeStore } from "@/store/useDateRangeStore";

const ranges = [
  {
    start: addDays(new Date(), -10),
    end: addDays(new Date(), -7),
  },
  {
    start: addDays(new Date(), 10),
    end: addDays(new Date(), 17),
  },
  {
    start: addDays(new Date(), 7),
    end: addDays(new Date(), 12),
  },
  {
    start: addDays(new Date(), -15),
    end: addDays(new Date(), -11),
  },
  {
    start: addDays(new Date(), 20),
    end: addDays(new Date(), 25),
  },
  {
    start: addDays(new Date(), 28),
    end: addDays(new Date(), 30),
  },
  {
    start: addDays(new Date(), 35),
    end: addDays(new Date(), 40),
  },
  {
    start: addDays(new Date(), 46),
    end: addDays(new Date(), 58),
  },
];

export function SearchMenu() {
  const ref = useRef<HTMLDivElement>(null);
  const searchStore = useRef(useTravelPreferencesStore.getState());
  const companionStore = useRef(useCompanionStore.getState());
  const locationStore = useRef(useLocationStore.getState());
  const dateRangeStore = useRef(useDateRangeStore.getState());
  const router = useRouter();
  useEffect(() => {
    useTravelPreferencesStore.subscribe(
      (state) => (searchStore.current = state)
    );
    useCompanionStore.subscribe((state) => (companionStore.current = state));
    useLocationStore.subscribe((state) => (locationStore.current = state));
    useDateRangeStore.subscribe((state) => (dateRangeStore.current = state));
  }, []);
  const handleSearch = async () => {
    if (
      !searchStore.current ||
      !companionStore.current ||
      !locationStore.current ||
      !dateRangeStore.current
    ) {
      console.error("Something went wrong");
      return;
    }
    if (locationStore.current.location === null) {
      locationStore.current.setErrorMsg("You must enter a location");
      return;
    }

    if (dateRangeStore.current.dateRange === null) {
      dateRangeStore.current.setErrorMsg("You must provide a date");
      return;
    }

    const obj = {
      ...searchStore.current,
      ...companionStore.current,
    };
    const uri = btoa(JSON.stringify(obj));
    router.push(`/visit?params=${uri}`);
  };
  return (
    <div className="flex flex-col relative shrink-0 w-full">
      <div
        ref={ref}
        className="relative rounded-2xl bg-white flex py-2 px-4 w-full"
      >
        <div className="flex relative lg:gap-2">
          <Location />
          <Calendar ranges={ranges} />
        </div>
        <div className="flex items-center ml-auto">
          <Filters />

          <button
            onClick={handleSearch}
            aria-label="Start searching"
            className="active:scale-95 hover:brightness-110 bg-teal-700 rounded-full lg:rounded-2xl flex items-center justify-center w-10 h-10 lg:w-auto lg:h-auto lg:px-6 text-white"
          >
            <SearchIcon className="lg:hidden w-6" />
            <span className="hidden lg:block lg:py-2">Search</span>
          </button>
        </div>
      </div>
    </div>
  );
}
