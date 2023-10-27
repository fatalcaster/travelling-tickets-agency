import { prisma } from "../prisma/client";

export async function getUnreadMessages(receiverId: string) {
  const messages = await prisma.message.findMany({
    select: {
      type: true,
      endDate: true,
      fromUser: {
        select: {
          id: true,
          image: true,
          email: true,
          name: true,
        },
      },
      createdAt: true,
      id: true,
      timestamp: true,
      startDate: true,
    },
    orderBy: {
      createdAt: "desc",
    },
    take: 10,
    where: { receiverId: receiverId },
  });
  return messages;
}
export async function createFriendRequest(from: string, to: string) {
  return await prisma.message.create({
    data: {
      type: "FRIEND_REQUEST",
      fromUser: {
        connect: {
          id: from,
        },
      },
      toUser: {
        connect: {
          id: to,
        },
      },
    },
  });
}
export async function getFriendRequest(from: string, to: string) {
  const request = await prisma.message.findFirst({
    where: { senderId: from, receiverId: to, type: "FRIEND_REQUEST" },
  });
  return request;
}
export async function isUserTheRecipient(messageId: string, userId: string) {
  const message = await prisma.message.findUnique({ where: { id: messageId } });
  return message?.receiverId === userId;
}

export async function deleteMessage(requestId: string) {
  return await prisma.message.delete({
    where: { id: requestId },
  });
}

export async function removeFriendRequest(from: string, to: string) {
  return await prisma.message.deleteMany({
    where: { senderId: from, receiverId: to, type: "FRIEND_REQUEST" },
  });
}
