import { prisma } from "@/lib/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]/route";
import {
  getBlockedProfiles,
  getProfilesBySearch,
} from "@/lib/services/user-service";
import { Session } from "next-auth";
export async function GET(request: NextRequest) {
  const session = (await getServerSession(authOptions)) as Session;

  const match = request.nextUrl.searchParams.get("search");
  if (match !== null) {
    return await getSearchResults(session, match, request);
  }

  const blocked = request.nextUrl.searchParams.get("blocked_only") === "true";
  if (blocked) {
    return getBlockedUsers(session, request);
  }
}

async function getSearchResults(
  session: Session,
  match: string,
  request: NextRequest
) {
  if (match.length < 2)
    return NextResponse.json(
      { error: "Bad request - matching pattern too short" },
      { status: 400 }
    );

  const friendsOnly =
    request.nextUrl.searchParams.get("friends_only") === "false";
  const users = await getProfilesBySearch(
    session!.user.id,
    match,
    5,
    friendsOnly
  );
  if (users !== null) {
    return NextResponse.json(users, { status: 200 });
  }

  return NextResponse.json({ error: "Bad Request" }, { status: 400 });
}

const TAKE_LIMIT = 10;

async function getBlockedUsers(session: Session, request: NextRequest) {
  let take: number = 5;
  let skip: number = 0;
  try {
    take = parseInt(request.nextUrl.searchParams.get("take") || "5");
    skip = parseInt(request.nextUrl.searchParams.get("skip") || "0");
    if (take > TAKE_LIMIT)
      throw new Error(`Take must be greater than ${TAKE_LIMIT}`);
  } catch {
    return NextResponse.json({
      error: `Bad request - 'take' and 'skip' must be numbers. 'take' must be less than ${TAKE_LIMIT}`,
    });
  }

  const result = await getBlockedProfiles(session.user.id, take, skip);
  return NextResponse.json(result, { status: 200 });
}
