import { prisma } from "@/lib/prisma/client";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../auth/[...nextauth]/route";
import { NextRequest, NextResponse } from "next/server";
import {
  createFriendRequest,
  deleteMessage,
  getFriendRequest,
} from "@/lib/services/message-service";
import { addFriend, removeFriend } from "@/lib/services/user-service";

// Creates friend request
export async function POST(
  _: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Not authorized" }, { status: 401 });
  }

  const id = params.id;

  if (id === session.user.id) {
    return NextResponse.json(
      { error: "Provided id is invalid" },
      { status: 400 }
    );
  }
  const existingRequest = await getFriendRequest(session.user.id, params.id);
  if (existingRequest !== null) {
    return NextResponse.json(
      { error: "You've already made a friend request" },
      { status: 400 }
    );
  }

  try {
    const friendReq = await createFriendRequest(session.user.id, id);

    return NextResponse.json(
      {
        mType: "FRIEND_REQUEST",
        from: friendReq.senderId,
        to: friendReq.receiverId,
        id: friendReq.id,
      },
      { status: 201 }
    );
  } catch (e) {
    console.log(e);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
export async function DELETE(
  _: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Not authorized" }, { status: 401 });
  }

  const id = params.id;

  if (!id || id === session.user.id) {
    return NextResponse.json(
      { error: "Provided id is invalid" },
      { status: 400 }
    );
  }

  try {
    await removeFriend(session.user.id, id);

    return NextResponse.json(
      { mType: "FRIEND_REQUEST", from: session.user.id, to: id },
      { status: 201 }
    );
  } catch (e) {
    console.log(e);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);
  if (!session || !session.user) {
    return NextResponse.json({ error: "Not authorized" }, { status: 401 });
  }

  const id = params.id;
  const isAccepted = request.nextUrl.searchParams.get("accept");

  if (id === null) {
    return NextResponse.json(
      { error: "Provided id is invalid" },
      { status: 400 }
    );
  }
  if (isAccepted === null) {
    return NextResponse.json(
      {
        error:
          "Provided response is invalid, the value can either be 'true' or 'false'",
      },
      { status: 400 }
    );
  }

  try {
    const response = await deleteMessage(id);

    if (response?.receiverId !== session.user.id) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const friendResponse = await addFriend(
      response.receiverId,
      response.senderId
    );

    return NextResponse.json(
      { mType: "FRIEND_REQUEST", from: session.user.id, to: id },
      { status: 200 }
    );
  } catch (e) {
    console.log(e);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
