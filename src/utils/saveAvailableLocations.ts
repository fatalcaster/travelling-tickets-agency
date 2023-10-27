import { prisma } from "@/lib/prisma/client";
import { headers } from "next/dist/client/components/headers";

async function saveAvailableLocations() {
  const headers: HeadersInit = new Headers();
  const response = await fetch(
    "https://partners.api.skyscanner.net/apiservices/v3/geo/hierarchy/flights/en-GB",
    { headers: {} }
  );
}
