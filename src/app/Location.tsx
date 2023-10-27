"use client";

import { LocationIcon } from "@/components/Icons";
import { useClickOutside } from "@/hooks/hooks";
import { useSearchSuggestions } from "@/hooks/useSearchSuggestions";
import { useToggleManager } from "@/hooks/useToggleManager";
import { getAdjustedStyleToParent } from "@/lib/getAdjustedStyleToParent";
import { ILocation } from "@/lib/types/Location";
import myFetch from "@/lib/utils/myFetch";
import { useLocationStore } from "@/store/useLocationStore";
import { AnimatePresence, motion } from "framer-motion";
import { ChangeEvent } from "react";

interface LocationProps {}

async function getMatchingLocations(match: string) {
  const response = await myFetch<ILocation[]>(`/api/locations?search=${match}`);
  return response;
}

export default function Location({}: LocationProps) {
  const {
    location,
    setLocation: setLocationStore,
    errorMsg,
    setErrorMsg,
  } = useLocationStore();
  // const location = useTravelPreferencesStore((state) => state.location);
  // const setLocation = useTravelPreferencesStore((state) => state.setLocation);

  const setLocation = (loc: ILocation) => {
    setErrorMsg(null);
    setLocationStore(loc);
  };

  const {
    isActive: isMenuActive,
    setActive: setMenuActive,
    setInactive: setMenuInactive,
  } = useToggleManager(false);

  const { inputValue, handleChange, error, suggestions } =
    useSearchSuggestions<ILocation>(getMatchingLocations);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setErrorMsg(null);
    handleChange(e);
  };

  const ref = useClickOutside<HTMLDivElement>(setMenuInactive);

  const redText = errorMsg ? "text-red-500" : "";

  return (
    <div className="flex justify-center">
      <motion.button
        animate={{ ...(errorMsg && { scale: [1, 1.2, 1, 1.2, 1] }) }}
        className={`flex items-center ${redText}`}
        onClick={setMenuActive}
        aria-label="Choose destination"
      >
        <LocationIcon className={`mr-1 w-6`} />
        <p className={`text-sm  truncate max-w-[12ch] hidden lg:block`}>
          {location?.name || "Location"}
        </p>
      </motion.button>
      <AnimatePresence>
        {isMenuActive && (
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            exit={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            ref={ref}
            className="absolute min-w-[300px] -left-4 rounded-2xl top-[120%] bg-white shadow-md h-fit max-w-md  z-30"
          >
            <div className="p-2 flex flex-col  gap-1">
              <input
                value={inputValue}
                onChange={onChange}
                className="rounded-2xl bg-neutral-50 text-lg h-10 pl-4 border outline-transparent focus:border-teal-700 w-full"
                placeholder="Amsterdam"
                autoFocus
              />
              {errorMsg && (
                <span className={`ml-3 block ${redText}`}>{errorMsg}</span>
              )}
            </div>
            {/* @ts-ignore */}
            {suggestions?.length ? (
              <LocationList
                searchValue={inputValue}
                select={setLocation}
                locations={suggestions}
                error={error}
                setInactive={setMenuInactive}
              />
            ) : null}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

type LocationListProps = {
  select: (location: ILocation) => void;
  setInactive: VoidFunction;
  searchValue: string;
} & (
  | {
      locations: ILocation[];
      error: null;
    }
  | {
      error: string;
      locations: null;
    }
);
function splitOverlap(match: string, word: string) {
  const index = word.toLowerCase().indexOf(match.toLowerCase());
  if (index === -1) return [word, "", ""];
  return [
    word.slice(0, index),
    word.slice(index, index + match.length),
    word.slice(index + match.length, word.length),
  ] as const;
}
function LocationList({
  error,
  locations,
  setInactive,
  select,
  searchValue,
}: LocationListProps) {
  if (error !== null) {
    return <>Test</>;
  }
  return (
    <ul className="pb-3 overflow-hidden">
      {locations.map((location, index) => {
        const split = splitOverlap(
          searchValue,
          location.name + ", " + location.country
        );

        return (
          <li
            className={`${
              "" // index !== locations.length - 1 && "border-b"
            } text-neutral-600`}
            key={location.entityId}
          >
            <button
              aria-label={location.name}
              className="w-full py-2 px-4 hover:bg-neutral-200 h-full text-left"
              onClick={() => {
                select(location);
                setInactive();
              }}
            >
              <span>
                {split[0].length ? split[0] : ""}
                {split[1].length ? <b>{split[1]}</b> : ""}
                {split[2].length ? split[2] : ""}
              </span>
            </button>
          </li>
        );
      })}
    </ul>
  );
}
// {isActive && (
// <div className="fixed h-screen w-screen bg-black opacity-10 top-0 left-0 z-20"></div>
// )}
