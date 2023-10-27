import { Companion } from "@/lib/types/Companion";
import { ReactNode } from "react";
import { ProfileIcon } from "./ProfileIcon";
import Link from "next/link";

interface UserListProps {
  data: Companion[];
  className?: string;
  actions: IAction[];
}
interface IAction {
  action: (id: Companion) => void;
  actionIcon?: ReactNode;
  actionDescription?: string;
  containerClassName?: string;
}

export default function UserList({
  data = [],
  actions,
  className,
}: UserListProps) {
  return (
    <ul className={`${className}`}>
      {data.map((friend) => (
        <UserListItem actions={actions} data={friend} key={friend.id} />
      ))}
    </ul>
  );
}
interface UserListItemProps {
  data: Companion;
  actions: IAction[];
}
function UserListItem({ actions, data }: UserListItemProps) {
  return (
    <li className=" w-full">
      <div className="flex flex-col py-3 items-center">
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
          <div className="ml-auto flex gap-2">
            {actions.map(
              (
                { actionDescription, actionIcon, action, containerClassName },
                index
              ) => (
                <button
                  key={index}
                  aria-label={actionDescription}
                  className={`text-white ml-auto text-2xl active:scale-110 flex items-center rounded-full p-2 active:bg-neutral-900 justify-center ${containerClassName}`}
                  onClick={() => action(data)}
                >
                  {actionIcon}
                </button>
              )
            )}
          </div>
        </div>
      </div>
    </li>
  );
}
