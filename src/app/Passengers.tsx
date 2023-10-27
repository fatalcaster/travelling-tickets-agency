"use client";

import { PassengerIcon } from "@/components/Icons";
import { useClickOutside } from "@/hooks/hooks";
import { getAdjustedStyleToParent } from "@/lib/getAdjustedStyleToParent";
import { useRef, useState } from "react";

enum PassengerType {
  Adult,
  Child,
}
interface PassengersProps {}
export default function Passengers() {
  const [isMenuActive, setIsMenuActive] = useState(false);
  const [passengers, setPassengers] = useState<{
    adults: number;
    children: number;
  } | null>(null);

  const toggleMenu = () => {
    setIsMenuActive((prev) => !prev);
  };

  const handlePassengersUpdate = (newNumber: number, type: PassengerType) => {
    if (type === PassengerType.Adult) {
      setPassengers((prev) => {
        if (prev === null) return { adults: newNumber, children: 0 };
        return { adults: newNumber, children: prev.children };
      });
    } else {
      setPassengers((prev) => {
        if (prev === null) return { children: newNumber, adults: 0 };
        return { children: newNumber, adults: prev.children };
      });
    }
  };

  const ref = useClickOutside<HTMLDivElement>(() => setIsMenuActive(false));
  return (
    <div className="relative">
      <button className="flex items-center py-4" onClick={toggleMenu}>
        <PassengerIcon className="mr-1" />
        <p className="text-sm hidden lg:block">
          {passengers
            ? `${passengers.adults} ad, ${passengers.children} ch`
            : "Passengers"}
        </p>
      </button>
      {isMenuActive && (
        <div
          ref={ref}
          className="absolute rounded-2xl p-2 bg-neutral-100 z-30 -left-4 flex flex-row gap-2 top-[120%]"
        >
          <label className="flex items-center ">Adults</label>
          <input
            className="rounded-2xl text-lg h-10 pl-4 border min-w-[4rem] focus:outline-neutral-400 w-5/12"
            defaultValue={1}
            min={0}
          />
          <label className="flex items-center">Children</label>
          <input
            min={0}
            defaultValue={0}
            className="rounded-2xl text-lg h-10 pl-4 border min-w-[4rem] focus:outline-neutral-400 w-5/12"
          />
        </div>
      )}
      {isMenuActive && (
        <div className="fixed h-screen w-screen bg-black opacity-10 top-0 left-0 z-20"></div>
      )}
    </div>
  );
}
