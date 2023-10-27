import { TMessage, getMessageText } from "@/lib/types/Messages";
import myFetch from "@/lib/utils/myFetch";
import { MessageType } from "@prisma/client";

export function useMessageManager() {
  function parseMessages(json: any[]): TMessage[] {
    if (!json || !json.length) return [];
    // @ts-ignore
    return json.map((m) => ({
      createdAt: m.createdAt,
      fromUser: m.fromUser,
      id: m.id,
      text: getMessageText(m.type as MessageType),
      type: m.type,
      timestamp: m.timestamp,
    }));
  }
  async function getMessages() {
    const response = await myFetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/messages`
    );
    return parseMessages(response.data as any);
  }
  return { getMessages };
}
