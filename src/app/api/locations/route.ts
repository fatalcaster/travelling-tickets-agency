import { ILocation } from "@/lib/types/Location";
import myFetch from "@/lib/utils/myFetch";
import { NextRequest, NextResponse } from "next/server";

const headers = new Headers();
headers.append("x-api-key", process.env.SKYSCANNER_API_KEY!);
headers.append("Content-Type", "application/json");
console.log("KEY API", process.env.SKYSCANNER_API_KEY);
const getQueryObject = (search: string) => ({
  query: {
    locale: "en-US",
    market: "US",
    searchTerm: search,
    includedEntityTypes: [PLACE_TYPE.COUNTRY, PLACE_TYPE.CITY],
  },
});

enum PLACE_TYPE {
  COUNTRY = "PLACE_TYPE_COUNTRY",
  CITY = "PLACE_TYPE_CITY",
  AIRPORT = "PLACE_TYPE_AIRPORT",
}
type TExpectedAPIResponse = {
  places: {
    hierarchy: string;
    location: string;
    score: number;
    name: string;
    highlight: {
      hierarchy: string;
      name: string;
    };
    entityId: string;
    type: PLACE_TYPE;
  }[];
};
export async function GET(request: NextRequest) {
  const search = request.nextUrl.searchParams.get("search");

  if (!search || search.length < 2) {
    return NextResponse.json(
      { error: "Bad request - search param must contain at least 2 letters" },
      { status: 400 }
    );
  }

  const response = await myFetch<TExpectedAPIResponse>(
    "https://partners.api.skyscanner.net/apiservices/v3/autosuggest/hotels",
    {
      method: "POST",
      headers: headers,
      body: JSON.stringify(getQueryObject(search)),
    }
  );

  if (response.error || !response.data) {
    console.log("ERROR GETTING LOCATIONS", response.error, response.data);
    return NextResponse.json(
      { error: response.error || "Something went wrong" },
      { status: 500 }
    );
  }

  const results: ILocation[] = response.data.places.map((place) => {
    const t = place.hierarchy.split("|");
    console.log(t);
    return {
      entityId: place.entityId,
      name: place.name,
      location: place.location,
      country: t.length > 1 ? t[t.length - 1] : place.name,
    };
  });

  return NextResponse.json(results, { status: 200 });
}
