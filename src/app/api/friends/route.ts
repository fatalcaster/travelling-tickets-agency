import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]/route";
import { NextResponse } from "next/server";
import { getFriendsOfUser } from "@/lib/services/user-service";

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: "Not authorized" }, { status: 401 });
  }
  const friends = await getFriendsOfUser(session.user.id);
  return NextResponse.json(friends, { status: 200 });
}
