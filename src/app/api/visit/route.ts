import type { Companion } from "@/lib/types/Companion";
import type { ILocation } from "@/lib/types/Location";
import type { StayType, TicketClass } from "@/lib/types/TravelSearchParams";
import { NextRequest, NextResponse } from "next/server";

interface SearchProps {
  location: ILocation;
  ticketClass: TicketClass;
  numOfChildren: number;
  isRoundTrip: boolean;
  directFlight: boolean;
  hotelType: StayType;
  companions: Companion[];
}

export async function GET(request: NextRequest) {
  // console.log("OVDE TAKODJE");
  // const params = atob(request.nextUrl.searchParams.get("params") || "");
  // console.log("GOT EM", params);
  // let json: SearchProps;
  // try {
  //   json = JSON.parse(params) as SearchProps;
  // } catch (e) {
  //   return NextResponse.json(
  //     { error: e || "Something went wrong - invalid JSON object" },
  //     { status: 400 }
  //   );
  // }

  //   console.log(request.nextUrl.searchParams.get("params"));
  //   console.log
  // const obj = { test: "Test" };
  // return NextResponse.json(obj);
  return NextResponse.json({ test: " Test" });
}
