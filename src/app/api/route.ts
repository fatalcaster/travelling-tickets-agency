import { getIpAddress } from "@/lib/getIpAddress";
import { NextRequest, NextResponse } from "next/server";

// const headerKey: HeadersInit = new Headers();

export async function GET(request: NextRequest) {
  const ip = getIpAddress(request);

  const response = await fetch(
    "https://partners.api.skyscanner.net/apiservices/v3/geo/hierarchy/flights/nearest",
    {
      headers: { "x-api-key": process.env.SKYSCANNER_API_KEY! },
      method: "POST",
      body: JSON.stringify({
        locator: {
          ipAddress:
            process.env.NODE_ENV === "development"
              ? process.env.LOCAL_IP
              : request.ip,
        },
        locale: "en-US",
      }),
    }
  );
  const data = await response.json();
  return NextResponse.json(data);
}
