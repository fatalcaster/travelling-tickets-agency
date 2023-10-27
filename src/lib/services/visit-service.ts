import type { ILocation } from "../types/Location";
import type { Companion } from "../types/Companion";
import myFetch from "../utils/myFetch";
import { StayType, TicketClass } from "../types/TravelSearchParams";

export interface SearchProps {
  location: ILocation;
  ticketClass: TicketClass;
  numOfChildren: number;
  isRoundTrip: boolean;
  directFlight: boolean;
  hotelType: StayType;
  companions: Companion[];
}

const headers = new Headers();
headers.append("x-api-key", process.env.SKYSCANNER_API_KEY!);
headers.append("Content-Type", "application/json");

interface QueryParams {
  numOfAdults: number;
  ticketClass: TicketClass;
}

const getOfferQuery = ({ numOfAdults, ticketClass }: QueryParams) => {
  return {
    query: {
      market: "US",
      locale: "en-US",
      currency: "USD",
      query_legs: [
        {
          origin_place_id: { iata: "LHR" },
          destination_place_id: { iata: "SIN" },
          date: { year: 2023, month: 12, day: 22 },
          nearbyAirports: true,
        },
      ],
      adults: numOfAdults,
      cabin_class: ticketClass,
    },
  };
};

export async function getVisitOffers(params: SearchProps) {
  const query: QueryParams = {
    numOfAdults: params.companions.length,
    ticketClass: params.ticketClass,
  };
  const response = await myFetch(
    "https://partners.api.skyscanner.net/apiservices/v3/flights/live/search/create",
    {
      headers: headers,
      method: "POST",
      body: JSON.stringify(getOfferQuery(query)),
    }
  );
  // console.log(response);
  return response;
}
