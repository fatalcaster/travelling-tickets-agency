import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function isAuthenticatedServer() {
  const session = await getServerSession(authOptions);
  if (!session) {
    return false;
  }
  return true;
}
