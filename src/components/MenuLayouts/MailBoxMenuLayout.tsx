"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { ProfileIcon } from "../ProfileIcon";
import { CheckIcon, NoBellIcon, XIcon } from "../Icons";
import { formatAMPM, formatDayMonth } from "@/lib/utils/date-manipulation";
import { getUnreadMessages } from "@/lib/services/message-service";
import { MessageType, TMessage, getMessageText } from "@/lib/types/Messages";
import { useSession } from "next-auth/react";
import { DefaultSession } from "next-auth";
import { PopupLoader } from "./PopupLoader";
import myFetch from "@/lib/utils/myFetch";
interface MailBoxMenuLayoutProps {
  messages: TMessage[];
}
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

async function respondToFriendRequest({
  mId,
  accept,
}: {
  mId: string;
  accept: boolean;
}) {
  await fetch(`/api/friends/${mId}?accept=${accept ? "true" : "false"}`, {
    method: "PUT",
  });
}

export default function MailBoxMenuLayout() {
  const session = useSession();
  const [inbox, setInbox] = useState<TMessage[]>([]);
  const [dataReady, setDataReady] = useState(false);

  const removeItem = (itemId: string) =>
    setInbox(inbox.filter((m) => m.id !== itemId));

  const respond = async (mType: MessageType, mId: string, accept: boolean) => {
    if (mType === MessageType.FriendRequest)
      await respondToFriendRequest({ mId, accept });
    removeItem(mId);
  };
  const reject = async (mType: MessageType, mId: string) => {
    await respond(mType, mId, false);
  };
  const accept = async (mType: MessageType, mId: string) => {
    await respond(mType, mId, true);
  };

  useEffect(() => {
    const updateMessages = async () => {
      const newMessages = await getMessages();
      setInbox(newMessages);
      setDataReady(true);
    };
    updateMessages();
  }, []);

  if (!dataReady) return <PopupLoader />;

  return (
    <div className="max-h-[400px] min-h-[350px] overflow-auto">
      {inbox.length ? (
        <ul className="py-2">
          <AnimatePresence>
            {inbox.map((message) => (
              <MessageListItem
                key={message.id}
                onAccept={accept}
                onReject={reject}
                message={message}
              />
            ))}
          </AnimatePresence>
        </ul>
      ) : (
        <div className="h-[40vh] flex items-center justify-center pb-[10%]">
          <p className="text-neutral-300 font-bold text-center">
            Looks empty over here
          </p>
        </div>
      )}
    </div>
  );
}

function MessageListItem({
  message,
  onAccept,
  onReject,
  ...props
}: { message: TMessage } & {
  onReject: (mType: MessageType, mId: string) => void;
  onAccept: (mType: MessageType, mId: string) => void;
}) {
  const hasDate =
    message.type === MessageType.MeetingRequest ||
    message.type === MessageType.VisitNotification;
  return (
    <motion.li
      layout
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.8, opacity: 0 }}
      transition={{ type: "spring", duration: 0.2 }}
      key={message.id}
      className="flex items-center p-2"
    >
      <div className="flex flex-col text-sm text-neutral-500">
        <div className="flex items-center">
          <ProfileIcon
            id={message.fromUser.id}
            src={message.fromUser.image}
            className="w-10 mr-4 mt-1"
          />
          <div>
            <p className="py-1 flex justify-between items-center font-medium -ml-1">
              {message.fromUser.name}
            </p>
            <p className="text-white">{message.text}</p>
          </div>
        </div>
        {hasDate && (
          <div className="gap-2 flex w-fit left-11 items-center relative  mt-2 rounded-full text-neutral-300 bg-neutral-800 px-2 text-[10px]">
            {message.type === MessageType.MeetingRequest &&
              // @ts-ignore
              `${formatDayMonth(props.timestamp)} - ${formatAMPM(
                // @ts-ignore
                props.timestamp
              )}`}
            {message.type === MessageType.VisitNotification &&
              // @ts-ignore
              `${formatDayMonth(props.from)} - ${formatDayMonth(props.to)}`}
          </div>
        )}
      </div>

      <div className="ml-auto gap-4 flex items-center ">
        <button
          className="bg-green-950 rounded-full p-1 hover:brightness-125"
          onClick={() => onAccept(message.type, message.id)}
        >
          <CheckIcon className="text-green-500 w-5 h-5" />
        </button>
        <button
          className="bg-red-950 rounded-full p-1 hover:brightness-125"
          onClick={() => onReject(message.type, message.id)}
        >
          {message.type === MessageType.VisitNotification ? (
            <NoBellIcon className="text-red-500 w-5 h-5" />
          ) : (
            <XIcon className="text-red-500 w-5 h-5" />
          )}
        </button>
      </div>
    </motion.li>
  );
}

const profile = () => ({
  image: "/pfp1.jpeg",
  email: "tetrwstsrtststsst",
  name: "Tina Ralevic",
  id: Math.random().toString(),
});

let uuid = function () {
  return URL.createObjectURL(new Blob([])).slice(-36);
};

// const messages: TMessage[] = [
//   {
//     id: uuid(),
//     type: MessageType.FriendRequest,
//     message: "Friend Request!",
//     fromUser: profile(),
//   },
//   {
//     id: uuid(),
//     type: MessageType.MeetingRequest,
//     message: "Wanna meet?",
//     fromUser: profile(),
//     timestamp: new Date(),
//   },
//   {
//     id: uuid(),
//     type: MessageType.VisitNotification,
//     message: "Coming by!",
//     from: new Date(),
//     to: new Date(),
//     fromUser: profile(),
//   },
//   {
//     id: uuid(),
//     type: MessageType.VisitNotification,
//     message: "Coming by!",
//     from: new Date(),
//     to: new Date(),
//     fromUser: profile(),
//   },
//   {
//     id: uuid(),
//     type: MessageType.VisitNotification,
//     message: "Coming by!",
//     from: new Date(),
//     to: new Date(),
//     fromUser: profile(),
//   },
//   {
//     id: uuid(),
//     type: MessageType.VisitNotification,
//     message: "Coming by!",
//     from: new Date(),
//     to: new Date(),
//     fromUser: profile(),
//   },
//   {
//     id: uuid(),
//     type: MessageType.VisitNotification,
//     message: "Coming by!",
//     from: new Date(),
//     to: new Date(),
//     fromUser: profile(),
//   },
//   {
//     id: uuid(),
//     type: MessageType.VisitNotification,
//     message: "Coming by!",
//     from: new Date(),
//     to: new Date(),
//     fromUser: profile(),
//   },
// ];
