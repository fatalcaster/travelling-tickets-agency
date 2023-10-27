import { use } from "react";
import { prisma } from "../prisma/client";

export async function getProfileById(id: string) {
  const user = await prisma.user.findUnique({
    select: { name: true, id: true, image: true, email: true },
    where: { id: id },
  });
  return user;
}

export async function addFriend(userOne: string, userTwo: string) {
  await prisma.user.update({
    where: { id: userOne },
    data: {
      friends: { connect: { id: userTwo } },
      friendOf: { connect: { id: userTwo } },
    },
  });
}

export async function removeFriend(userOne: string, userTwo: string) {
  await prisma.user.update({
    where: { id: userOne },
    data: {
      friends: { disconnect: { id: userTwo } },
      friendOf: { disconnect: { id: userTwo } },
    },
  });
}

export async function blockUser(owner: string, userToBlock: string) {
  await prisma.user.update({
    where: { id: owner },
    data: {
      hasBlocked: { connect: { id: userToBlock } },
    },
  });
}

export async function unblockUser(owner: string, userToUnblock: string) {
  await prisma.user.update({
    where: { id: owner },
    data: {
      hasBlocked: { disconnect: { id: userToUnblock } },
    },
  });
}

export async function getFriendsOfUser(id: string) {
  return await prisma.user.findMany({
    select: { id: true, image: true, email: true, name: true },
    where: { friendOf: { some: { id: id } } },
  });
}

export async function getProfile(requesterId: string, requestedId: string) {
  const user = await prisma.user.findUnique({
    where: { id: requestedId },
    select: {
      image: true,
      name: true,
      email: true,
      id: true,
      age: true,
      friendOf: {
        select: { id: true },
        where: {
          id: requesterId,
        },
      },
      messagesGotten: {
        select: { id: true },
        where: {
          senderId: requesterId,
          type: "FRIEND_REQUEST",
        },
      },
      mutedBy: {
        select: { id: true },
        where: {
          id: requesterId,
        },
      },
    },
  });

  // checks if the request is friend with the current profile, simplifies frontend
  if (!user) return user;
  (
    user as typeof user & {
      isFriend: boolean;
      friendOf?: { id: string }[];
      mutedBy?: { id: string }[];
      messagesGotten: { id: string }[];
      friendRequestSent: string | null;
      notificationsOn: boolean;
    }
  ).isFriend = user.friendOf[0] !== undefined;

  // checks to see whether the friend request has already been sent
  const result = {
    isFriend: user.friendOf[0] !== undefined,
    ...user,
    friendRequestSent:
      user.messagesGotten.length > 0 ? user.messagesGotten[0].id : null,
    notificationsOn: user.mutedBy.length > 0 ? true : false,
    messagesGotten: undefined,
    friendOf: undefined,
    mutedBy: undefined,
  };

  // deleted unnecessary id fields
  delete result["friendOf"];
  delete result["messagesGotten"];
  delete result["mutedBy"];
  return result;
}

export async function getProfilesBySearch(
  reqId: string,
  match: string,
  take: number = 5,
  friendsOnly: boolean = true
) {
  const users = await prisma.user.findMany({
    select: { name: true, id: true, image: true, email: true },
    take: take,
    where: {
      id: { notIn: [reqId] },
      blockedBy: { none: { id: reqId } },
      hasBlocked: { none: { id: reqId } },
      ...(friendsOnly && { friendOf: { some: { id: reqId } } }),
    },
    orderBy: {
      _relevance: {
        fields: ["name", "email"],
        search: match,
        sort: "asc",
      },
    },
  });
  return users;
}

export async function muteUser(owner: string, userToMute: string) {
  await prisma.user.update({
    where: { id: owner },
    data: {
      muted: { connect: { id: userToMute } },
    },
  });
}

export async function unmuteUser(owner: string, userToUnmute: string) {
  await prisma.user.update({
    where: { id: owner },
    data: {
      muted: { disconnect: { id: userToUnmute } },
    },
  });
}

export async function getBlockedProfiles(
  requesterId: string,
  take: number = 5,
  skip: number = 0
) {
  return await prisma.user.findMany({
    select: { name: true, email: true, image: true, id: true },
    where: { blockedBy: { some: { id: requesterId } } },
    take: take,
    skip: skip,
  });
}
