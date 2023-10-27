"use client";

import { EnvelopeIcon } from "@/components/Icons";
import { useMessageManager } from "@/hooks/useMessageManager";
import { useEffect, useState } from "react";

interface PendingInvitesProps {
  openMailbox: () => void;
}

export function PendingInvites({ openMailbox }: PendingInvitesProps) {
  const [isInboxEmpty, setIsInboxEmpty] = useState(true);
  const { getMessages } = useMessageManager();
  useEffect(() => {
    const handleMessagesFetch = async () => {
      const response = await getMessages();
      if (response.length > 0) setIsInboxEmpty(false);
      else setIsInboxEmpty(true);
    };
    handleMessagesFetch();
  }, []);

  return (
    <div className="rounded-2xl bg-black block items-center justify-center relative w-18 h-18 p-2">
      <button
        aria-label="Inbox"
        className="flex items-center justify-center "
        onClick={openMailbox}
      >
        <EnvelopeIcon className="text-neutral-500   w-8 h-8 self-center hover:text-white" />
      </button>
      {!isInboxEmpty && (
        <span className="absolute flex h-2 w-2 right-1.5 top-2.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-600 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-teal-700"></span>
        </span>
      )}
    </div>
  );
}
