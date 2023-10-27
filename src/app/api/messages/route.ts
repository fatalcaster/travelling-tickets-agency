import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]/route";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma/client";
import {
  getUnreadMessages,
  removeFriendRequest,
} from "@/lib/services/message-service";
import { MessageType } from "@prisma/client";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Not authorized" }, { status: 401 });
  }
  try {
    const messages = await getUnreadMessages(session.user!.id);

    return NextResponse.json(messages, { status: 200 });
  } catch (e) {
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
export async function DELETE(req: NextRequest) {
  const to = req.nextUrl.searchParams.get("to") as string;
  const type = req.nextUrl.searchParams.get("type") as MessageType;

  const session = await getServerSession(authOptions);
  console;
  if (type === MessageType.FRIEND_REQUEST) {
    const t = await removeFriendRequest(session!.user!.id, to);
    if (t.count === 0)
      return NextResponse.json({ error: "Request not found" }, { status: 404 });
    return NextResponse.json({}, { status: 200 });
  }
  return NextResponse.json({ error: "Bad request" }, { status: 400 });
}
