"use client";
import Circle from "@/components/Circle";
import { Map } from "./Map";
import { isMobile } from "@/lib/utils/is-mobile";
import { useState } from "react";
import { motion } from "framer-motion";
import { useSwipeable } from "react-swipeable";

interface DestinationOptionProps {
  data: {
    destination: string;
    time: {
      date: string;
      from: number;
      to: number;
    };
  };
}
function DestinationOption({ data }: DestinationOptionProps) {
  const theme = data.time.from > 20 || data.time.from < 5 ? "dark" : "light";
  const fbuttonghtLength =
    data.time.to < data.time.from
      ? data.time.to + 24 - data.time.from
      : data.time.to - data.time.from;
  const textColor = theme === "dark" ? "text-white" : "text-black";
  return (
    <div
      className={`rounded-2xl flex p-4 w-full ${
        theme === "dark" ? "bg-black" : "bg-neutral-100"
      } `}
    >
      <div>
        <p className={`${textColor}  font-bold text-lg`}>{data.destination}</p>
        <p className="text-neutral-500 text-sm text-left">{data.time.date}</p>
      </div>
      <div className="ml-auto">
        <Circle from={data.time.from % 12} to={data.time.to % 12} theme={theme}>
          <p className={`${textColor} font-bold`}>{fbuttonghtLength}h</p>
        </Circle>
      </div>
    </div>
  );
}

function MapMenu() {
  return (
    <div className="flex flex-col justify-center items-center">
      <div className="min-w-[300px] min-h-[300px] overflow-hidden rounded-2xl aspect-square">
        <Map />
      </div>
      <div className=" flex justify-between gap-5 mt-2 px-3">
        <p className="text-xs text-neutral-500">
          <span className="rounded-full w-2 h-2 inline-block bg-pink-600"></span>
          <span>Planned to visit</span>
        </p>
        <p className="text-xs text-neutral-500">
          <span className="rounded-full w-2 h-2 inline-block bg-gray-300"></span>
          <span>Visited</span>
        </p>
        <p className="text-xs text-neutral-500">
          <span className="rounded-full w-2 h-2 inline-block bg-teal-600"></span>{" "}
          <span>Hot offers</span>
        </p>
      </div>
    </div>
  );
}

function Flights() {
  return (
    <div className="flex flex-col h-fit max-h-[324px] w-full">
      <div>
        <p className="font-bold lg:text-2xl text-xl">Hello, Gerald</p>
        <p className="lg:text-sm text-xs text-neutral-400">
          You need to check in your upcoming flights
        </p>
      </div>
      <div className="mb-5 overflow-y-auto mt-2">
        <ul className="flex flex-col gap-5">
          <button>
            <DestinationOption
              data={{
                destination: "Washington, DC",
                time: { from: 21, to: 22, date: "May 23, 2023" },
              }}
            />
          </button>
          <button>
            <DestinationOption
              data={{
                destination: "Washington, DC",
                time: { from: 12, to: 22, date: "May 14, 2021" },
              }}
            />
          </button>
          <button>
            <DestinationOption
              data={{
                destination: "Washington, DC",
                time: { from: 12, to: 22, date: "May 14, 2021" },
              }}
            />
          </button>
          <button>
            <DestinationOption
              data={{
                destination: "Washington, DC",
                time: { from: 12, to: 22, date: "May 14, 2021" },
              }}
            />
          </button>
        </ul>
      </div>
      <div className="mt-auto flex w-full  justify-between md:px-2">
        <button className="text-white bg-teal-700 whitespace-nowrap rounded-2xl lg:px-4 text-sm md:px-5 px-10 lg:text-lg py-2 lg:w-1/2 hover:brightness-110">
          Check in
        </button>
        <button className="text-neutral-600 md:w-[100px] lg:w-5/12 px-10 lg:px-0 whitespace-nowrap  hover:underbuttonne hover:font-medium hover:text-black text-center">
          See all
        </button>
      </div>
    </div>
  );
}

export function FlightsMenu() {
  enum Menu {
    Flight,
    Map,
  }

  const [activeMenu, setActiveMenu] = useState(Menu.Flight);
  const handlers = useSwipeable({
    onSwipedLeft: () => {
      setActiveMenu(Menu.Map);
    },
    onSwipedRight: () => {
      setActiveMenu(Menu.Flight);
    },
  });
  const btnClassNames = `rounded-full w-4 h-2 bg-neutral-400`;
  return (
    <div className="w-full bg-white rounded-2xl p-4 justify-center items-center">
      <div className="hidden lg:flex w-full gap-5">
        <Flights />
        <MapMenu />
      </div>
      <div {...handlers} className="lg:hidden w-full">
        {activeMenu === Menu.Flight && <Flights />}
        {activeMenu === Menu.Map && <MapMenu />}
        <div className=" flex items-center justify-center gap-2 mt-2">
          <button
            onClick={() => setActiveMenu(Menu.Flight)}
            className={`${btnClassNames} ${
              activeMenu === Menu.Map ? "brightness-125" : ""
            }`}
          ></button>
          <button
            onClick={() => setActiveMenu(Menu.Map)}
            className={`${btnClassNames}
              ${activeMenu === Menu.Flight ? "brightness-125" : ""}
          
          `}
          ></button>
        </div>
      </div>
    </div>
  );
}
