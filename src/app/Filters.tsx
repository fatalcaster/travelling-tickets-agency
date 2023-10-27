"use client";
import { FilterIcon, MinusIcon, XIcon } from "@/components/Icons";
import { AnimatePresence, motion } from "framer-motion";
import { DropDownSelect } from "@/components/DropdownSelect";
import { useTravelPreferencesStore } from "../store/useTravelPreferencesStore";
import { ReactNode, useState } from "react";
import { useClickOutside } from "@/hooks/hooks";
import { useToggleManager } from "@/hooks/useToggleManager";
import { StayType, TicketClass } from "@/lib/types/TravelSearchParams";
export function Filters() {
  const {
    isActive: isFilterActive,
    setActive: setFilterActive,
    setInactive: setFilterInactive,
  } = useToggleManager(false);
  const menuRef = useClickOutside<HTMLDivElement>(setFilterInactive);
  const {
    setEconomyClass,
    ticketClass,
    setBusinessClass,
    setFirstClass,
    setOneWayTrip,
    incrementNumberOfChildren,
    decrementNumberOfChildren,
    setStayType,
    numOfChildren,
    isRoundTrip,
    hotelType,
    setRoundTrip,
  } = useTravelPreferencesStore();

  return (
    <div className="h-full md:position-unset items-center flex">
      <button
        onClick={setFilterActive}
        aria-label="Filter"
        className="bg-neutral-200 rounded-full flex items-center justify-center lg:rounded-2xl w-10 h-10 lg:w-auto lg:h-auto lg:px-4 mr-2"
      >
        <FilterIcon className="lg:hidden w-6" />
        <span className="hidden lg:block lg:py-2">Filters</span>
      </button>
      {isFilterActive && (
        <AnimatePresence>
          {isFilterActive && (
            <motion.div
              ref={menuRef}
              initial={{ y: -20, opacity: 0 }}
              exit={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="absolute  inset-x-0  max-w-fit md:mr-0 mx-auto md:right-0 top-[104%] min-w-[340px] rounded-2xl pr-4 py-2 bg-white flex flex-col justify-center z-30 whitespace-nowrap shadow-md"
            >
              <div className="grid grid-cols-4 content-center items-center ">
                <Row name="Class">
                  <div className="flex border-b-2 border-neutral-100 py-2   text-xs w-full">
                    <button
                      className={`flex items-center justify-center w-[6em] h-[2.3em] ${
                        ticketClass === TicketClass.Economy
                          ? "bg-teal-700 text-white"
                          : "bg-neutral-200"
                      }  mr-2 rounded-3xl `}
                      onClick={setEconomyClass}
                    >
                      Economy
                    </button>
                    <button
                      onClick={setFirstClass}
                      className={`flex items-center justify-center w-[6em] h-[2.3em] ${
                        ticketClass === TicketClass.First
                          ? "bg-teal-700 text-white"
                          : "bg-neutral-200"
                      }  mr-2 rounded-3xl `}
                    >
                      First
                    </button>
                    <button
                      onClick={setBusinessClass}
                      className={`flex items-center justify-center w-[6em] h-[2.3em] ${
                        ticketClass === TicketClass.Business
                          ? "bg-teal-700 text-white"
                          : "bg-neutral-200"
                      }  mr-2 rounded-3xl `}
                    >
                      Business
                    </button>
                  </div>
                </Row>
                <Row name="Trip">
                  <div className="flex buttonst-none border-b-2 border-neutral-100 py-2 text-xs w-full">
                    <button
                      onClick={setRoundTrip}
                      className={`flex items-center justify-center w-[6em] h-[2.3em] ${
                        isRoundTrip
                          ? "bg-teal-700 text-white"
                          : " bg-neutral-200 text-black"
                      }  mr-2 rounded-3xl `}
                    >
                      Round
                    </button>
                    <button
                      onClick={setOneWayTrip}
                      className={`flex items-center justify-center w-[6em] h-[2.3em] ${
                        !isRoundTrip
                          ? "bg-teal-700 text-white"
                          : " bg-neutral-200 text-black"
                      }  mr-2 rounded-3xl `}
                    >
                      One way
                    </button>
                  </div>
                </Row>

                <Row name="Type">
                  <div className="py-2 border-b-2 border-neutral-100">
                    <DropDownSelect
                      selected={hotelType}
                      onChange={(selection) => {
                        setStayType(selection as StayType);
                      }}
                      className="text-sm"
                      options={[
                        StayType.BestValue,
                        StayType.Cheap,
                        StayType.Luxury,
                      ]}
                    />
                  </div>
                </Row>
                <Row name="Other">
                  <ul className="flex w-full   py-3 ">
                    <li className="flex justify-center items-center accent-teal-700 mr-4">
                      <label
                        htmlFor="direct_flight"
                        className="mr-2 text-neutral-600 text-sm"
                      >
                        Direct flight
                      </label>
                      <input
                        id="direct_flight"
                        type="checkbox"
                        className="w-5 h-5"
                      />
                    </li>
                    <li className="flex justify-center items-center accent-teal-700 mr-4">
                      <label
                        htmlFor="pet_friendly"
                        className="mr-2 text-neutral-600 text-sm"
                      >
                        Pet Friendly
                      </label>
                      <input
                        type="checkbox"
                        id="pet_friendly"
                        className="w-5 h-5"
                      />
                    </li>
                  </ul>
                </Row>
                <Row name="">
                  <div className="flex text-sm mb-1">
                    <div className="flex justify-center items-center accent-teal-700 ">
                      <p className=" mr-1 text-neutral-600">
                        Number of children:
                      </p>
                      <div className="flex items-center border rounded-lg ml-3 ">
                        <button
                          onClick={decrementNumberOfChildren}
                          className="bg-neutral-300 rounded-l p-1 active:bg-teal-700 "
                        >
                          <MinusIcon className="w-4 h-4 stroke-2 text-neutral-700 active:text-white" />
                        </button>
                        <p className="px-3 text-sm">{numOfChildren}</p>
                        <button
                          onClick={incrementNumberOfChildren}
                          className="bg-neutral-300 rounded-r p-1 active:bg-teal-700 "
                        >
                          <XIcon className="w-4 h-4 stroke-2 rotate-45 text-neutral-700 active:text-white" />
                        </button>
                      </div>
                    </div>
                  </div>
                </Row>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </div>
  );
}

interface RowProps {
  name: string;
  children?: ReactNode;
}
function Row({ name, children }: RowProps) {
  return (
    <>
      <p className="col-span-1 text-center align-middle content-center mb-0.5 text-sm text-neutral-700">
        {name}
      </p>
      <div className="col-span-3 ">{children}</div>
    </>
  );
}
