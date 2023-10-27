import { Companion } from "@/lib/types/Companion";
import { ProfileIcon } from "../ProfileIcon";
import { ReactNode } from "react";
import Link from "next/link";

interface CompanionListProps {
  data: Companion[];
  action?: (comp: Companion) => void;
  className?: string;
  actionIcon?: ReactNode;
  actionDescription?: string;
}

export default function CompanionList({
  data = [],
  action,
  className,
  actionIcon,
  actionDescription,
}: CompanionListProps) {
  return (
    <ul className={`${className}`}>
      {data.map((friend) => (
        <CompanionListItem
          actionIcon={actionIcon}
          action={action!}
          data={friend}
          key={friend.id}
          actionDescription={actionDescription}
        />
      ))}
    </ul>
  );
}
interface CompanionListItemProps {
  data: Companion;
  action: (id: Companion) => void;
  actionIcon?: ReactNode;
  actionDescription?: string;
}
function CompanionListItem({
  action,
  data,
  actionIcon,
  actionDescription,
}: CompanionListItemProps) {
  return (
    <li className=" w-full">
      <div className="flex flex-col p-2 items-center">
        <div className="flex w-full items-center">
          <Link href={`/profile/${data.id}`}>
            <ProfileIcon
              src={data.image}
              className="lg:w-12 lg:h-12 w-10 h-10 mr-2"
            />
          </Link>
          <div className="leading-3 mt-1 ">
            <p className="text-white">{data.name}</p>
            <p className="text-xs text-neutral-400">
              @{data.email.split("@")[0]}
            </p>
          </div>
          <button
            aria-label={actionDescription}
            className="text-white ml-auto text-2xl active:scale-110 hover:text-red-200 flex items-center justify-center"
            onClick={() => action(data)}
          >
            {actionIcon}
          </button>
        </div>
      </div>
    </li>
  );
}
