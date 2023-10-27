import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../auth/[...nextauth]/route";
import {
  blockUser,
  muteUser,
  unblockUser,
  unmuteUser,
} from "@/lib/services/user-service";
import type { Session } from "next-auth";
import { stat } from "fs";

// export async function DELETE(
//   request: NextRequest,
//   { params }: { params: { id: string } }
// ) {
//   const session = (await getServerSession(authOptions)) as Session;

//   try {
//     blockUser(session.user!.id, params.id);
//     return NextResponse.json({}, { status: 200 });
//   } catch (e) {
//     console.log(e);
//     return NextResponse.json({ error: "Internal error" }, { status: 500 });
//   }
// }
enum ProfileOptions {
  Mute = "mute",
  Block = "block",
}
export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = (await getServerSession(authOptions)) as Session;

  const optionName = request.nextUrl.searchParams.get(
    "opt_name"
  ) as ProfileOptions;
  const optionValue = request.nextUrl.searchParams.get("opt_val");
  switch (optionName) {
    case ProfileOptions.Mute: {
      if (session.user.id === params.id)
        return NextResponse.json(
          { error: "Bad Request - You cannot mute yourself" },
          { status: 400 }
        );
      if (optionValue === "true") muteUser(session.user.id, params.id);
      else if (optionValue === "false") unmuteUser(session.user.id, params.id);
      else
        return NextResponse.json(
          {
            error: `Bad request - opt_val for ${optionName} can either be 'true' or 'false'`,
          },
          { status: 400 }
        );
      return NextResponse.json(
        { message: `${optionName} successfully updated` },
        { status: 200 }
      );
    }
    case ProfileOptions.Block: {
      if (session.user.id === params.id)
        return NextResponse.json(
          { error: "Bad Request - You cannot block yourself" },
          { status: 400 }
        );
      if (optionValue === "true") blockUser(session.user.id, params.id);
      else if (optionValue === "false") unblockUser(session.user.id, params.id);
      else
        return NextResponse.json(
          {
            error: `Bad request - opt_val for ${optionName} can either be 'true' or 'false'`,
          },
          { status: 400 }
        );
      return NextResponse.json(
        { message: `${optionName} successfully updated` },
        { status: 200 }
      );
    }
    default: {
      return NextResponse.json(
        {
          error: `Bad request - unknown opt_name ${optionName}`,
        },
        { status: 400 }
      );
    }
  }
}
