import {
  ArrowIcon,
  DottedPath,
  EarthIcon,
  Plane,
  Square,
  StarIcon,
  TakeawayIcon,
  WatchIcon,
} from "@/components/Icons";
import Image from "next/image";
import { SearchMenu } from "./SearchMenu";
import { UserBar } from "./TravellersMenu";
import { cookies } from "next/dist/client/components/headers";
import { getCsrfToken, getProviders } from "next-auth/react";
import { authOptions } from "./api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth/next";
import { Companion } from "@/lib/types/Companion";
import DiscountStack from "./DiscountStack";
import type { Session } from "next-auth";
import { FlightsMenu } from "./FlightsMenu";

interface DiscountProps {
  className?: string;
  title: string;
  description: string;
  expiringOn: string;
}

function Discount({
  className,
  expiringOn,
  title,
  description,
}: DiscountProps) {
  return (
    <div className={` ${className}`}>
      <div className=" bg-white rounded-2xl p-4 min-w-[300px] lg:min-w-full">
        <div className="flex items-center  justify-between">
          <div className="bg-black flex text-white rounded-3xl items-center p-3 h-8 ">
            <WatchIcon className="mr-1 w-5" />
            <p className="text-sm ">{expiringOn} left</p>
          </div>
          <button className="bg-neutral-200 rounded-2xl p-3">
            <TakeawayIcon />
          </button>
        </div>
        <div className="flex flex-col">
          <div className="flex flex-col">
            <h1 className="font-bold text-2xl mb-2">{title}</h1>
            <p className=" text-neutral-500 mb-2">{description}</p>
          </div>
          <Image
            src="/desert.jpg"
            alt="acc"
            width={320}
            height={180}
            className="rounded-2xl pointer-events-none"
          />
        </div>
      </div>
    </div>
  );
}
interface TicketProps {
  className?: string;
}
function Ticket({ className }: TicketProps) {
  return (
    <div
      className={`${className} flex flex-col lg:flex-row  bg-white rounded-2xl overflow-hidden lg:relative whitespace-nowrap max-w-min`}
    >
      <div className="hidden lg:block rounded-full bg-neutral-300 absolute w-6 h-6 m-auto inset-x-0 -top-[10%] -left-[22%] "></div>
      <div className="hidden lg:block rounded-full  bg-neutral-300 absolute w-6 h-6 m-auto inset-x-0 -bottom-[10%] -left-[22%] "></div>
      <div className="hidden lg:flex flex-col justify-center px-6 border-r-2 gap-5">
        <div className="flex gap-4 justify-between">
          <div className="flex flex-col">
            <p className="text-xs  text-neutral-500 ">Date</p>
            <p className="text-xs font-medium">12/05/2023</p>
          </div>
          <div className="flex flex-col ">
            <p className="text-xs  text-neutral-500 ">Boarding</p>
            <p className="text-xs font-medium">4:30am</p>
          </div>
        </div>
        <div className="flex gap-4 justify-between">
          <div className="flex flex-col  ">
            <p className="text-xs  text-neutral-500 ">Passenger</p>
            <p className="text-xs font-medium ">Gerald Bergnaum</p>
          </div>
          <div className="flex flex-col">
            <p className="text-xs  text-neutral-500 ">Seat</p>
            <p className="text-xs font-medium">A23</p>
          </div>
        </div>
      </div>
      <div className="flex flex-col  pb-3  items-center justify-center lg:pb-6">
        <p className="font-bold text-center text-sm w-full  lg:mb-0 py-2 lg:py-0 lg:mt-5">
          GF 7201
        </p>
        <div className="flex mt-3 items-center w-full justify-between whitespace-nowrap pr-6 pl-6">
          <div className="flex flex-col items-center">
            <h1 className="font-bold text-4xl">DC</h1>
            <p className="text-xs text-neutral-500">Washington</p>
          </div>
          <div className="flex flex-col items-center w-[50%] pl-2 pr-2 ">
            <div className="flex justify-between w-full items-center mb-3">
              <Square />
              <DottedPath />
              <Plane />
              <DottedPath />
              <Square />
            </div>
            <p className="bg-yellow-400 rounded-3xl pt-2 pb-2 pr-3 pl-3 ">
              5h 45m
            </p>
          </div>

          <div className="flex flex-col items-center text-end">
            <h1 className="font-bold text-4xl">LA</h1>
            <p className="text-xs text-neutral-500 ">Los Angeles</p>
          </div>
        </div>
        <div className="lg:hidden w-full mt-5  flex justify-center items-center pr-10 pl-10">
          <Image src="/barcodeLast.jpg" alt="acc" width={180} height={40} />
        </div>
        <div className="flex  w-full lg:hidden justify-between p-5">
          <div className="flex  flex-col justify-center gap-5  w-full  ">
            <div className="flex justify-between gap-8">
              <div className="flex flex-col">
                <p className="text-xs  text-neutral-500 ">Date</p>
                <p className="text-xs font-medium">12/05/2023</p>
              </div>
              <div className="flex flex-col ">
                <p className="text-xs  text-neutral-500 ">Boarding</p>
                <p className="text-xs font-medium">4:30am</p>
              </div>
            </div>
            <div className="flex justify-between gap-8">
              <div className="flex flex-col">
                <p className="text-xs  text-neutral-500 ">Passenger</p>
                <p className="text-xs font-medium">Gerald Bergnaum</p>
              </div>
              <div className="flex flex-col">
                <p className="text-xs  text-neutral-500 ">Seat</p>
                <p className="text-xs font-medium">A23</p>
              </div>
            </div>
          </div>
          <div className="lg:hidden flex justify-center items-center ml-7 ">
            <Image src="/qr-code.png" alt="acc" width={150} height={150} />
          </div>
        </div>
      </div>
    </div>
  );
}

function ProPlan() {
  return (
    <div className="bg-gradient-to-r from-teal-900 to-teal-700 flex flex-col rounded-2xl lg:ml-3 p-6 relative ">
      {/* <div className="flex absolute inset-y-28 right-[10%]">
          <DottedPath />
          <EarthIcon className=" stroke-white " />
          <DottedPath />
        </div> */}
      <h1 className="font-bold text-xl text-white mb-2">PRO PLAN</h1>
      <p className="mb-3 text-gray-200 text-sm ">
        Gain access to our curated collection of insider tips & more.
      </p>
      <button className="bg-yellow-400 w-fit flex rounded-2xl p-3 justify-center items-center">
        <StarIcon className="w-4 h-4 mr-1 fill-black" />
        <p className="font-medium">Try Pro Plan</p>
      </button>
    </div>
  );
}

const fakeUser: Companion = {
  id: "tew",
  name: "Tina",
  image: "/pfp1.jpeg",
  email: "tinaxox",
};

export default async function Home() {
  const providers = await getProviders();
  const cookie = cookies();
  const csrfToken = await getCsrfToken(cookie as any);
  const session = (await getServerSession(authOptions)) as Session;
  console.log(session);
  const discounts: DiscountProps[] = [
    {
      description: "Make this summer unforgettable",
      expiringOn: "",
      title: "7 days on Malta",
    },
    {
      description: "Make this summer unforgettable",
      expiringOn: "7d",
      title: "7 days on Cyprus",
    },
  ];

  return (
    <main className="flex flex-col items-center justify-center w-full  p-3">
      <div className="flex flex-col justify-center items-center w-full gap-3 max-w-7xl">
        <div className="flex flex-col md:flex-row justify-between items-center  w-full  gap-5 md:gap-4 lg:gap-5">
          <div className="w-full md:w-6/12 lg:w-5/12">
            <UserBar
              providers={providers}
              csrfToken={csrfToken}
              session={session}
            />
          </div>
          <div className="w-full flex md:w-full lg:w-7/12">
            <SearchMenu />
          </div>
        </div>

        <div className="flex flex-col  md:flex-row items-center w-full gap-6 lg:gap-4">
          <div className=" relative flex w-full md:w-6/12 lg:w-5/12 h-[360px] ">
            <DiscountStack>
              {discounts.map((discount, index) => {
                return (
                  <Discount
                    key={index}
                    expiringOn={discount.expiringOn}
                    title={discount.title}
                    description={discount.description}
                  />
                );
              })}
            </DiscountStack>
          </div>
          <div className=" flex w-full md:w-6/12 lg:w-7/12 justify-center md:justify-end ">
            <div
              // className="min-h-[350px] lg:min-w-[600px] md:min-w-[380px] max-w-[350px] min-w-[350px]"
              style={{ width: "clamp(350px, 600px,700px)" }}
            >
              <FlightsMenu />
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-7 lg:flex-row items-center justify-center lg:mt-12 mt-4 max-w-[350px] lg:max-w-full">
          <div className="lg:mr-auto  relative w-full  max-w-min  z-0">
            <div className="lg:h-[170px] h-[400px] w-full ">
              <Ticket className="shadow-sm" />
            </div>
            <div className="h-[170px] absolute top-[5%] rotate-3 brightness-90 -z-10">
              <Ticket className="shadow-lg" />
            </div>
            <div className="h-[170px] absolute top-[10%] rotate-6 brightness-90 -z-20">
              <Ticket />
            </div>
          </div>
          <div className=" lg:mt-0 lg:min-w-max">
            <ProPlan />
          </div>
        </div>
      </div>
    </main>
  );
}
