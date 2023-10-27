"use client";

import {
  AddUserIcon,
  BellIcon,
  CalendarIcon,
  DottedPath,
  EnvelopeIcon,
  ExitIcon,
  NoBellIcon,
  NoIcon,
  RemoveUserIcon,
  SettingsIcon,
  TrashCan,
  UserGroupIcon,
} from "@/components/Icons";
import { useClickOutside } from "@/hooks/hooks";
import Image from "next/image";
import React, { ReactNode, useEffect, useState } from "react";
import { motion } from "framer-motion";
import type { Session } from "next-auth";
import { SessionProvider, useSession } from "next-auth/react";
import { usePopupMenu } from "@/hooks/usePopupMenu";
import { Companion } from "@/lib/types/Companion";
import { PopupLoader } from "@/components/MenuLayouts/PopupLoader";
import { PopupPlaceholder } from "@/components/MenuLayouts/PopupPlaceholder";
import myFetch from "@/lib/utils/myFetch";
import UserList from "@/components/UserList";
import { ScheduleMenuLayout } from "@/components/ProfileOptionLayouts/ScheduleMenuLayout";
import { MessageType } from "@prisma/client";
import { useOptimisticState } from "@/hooks/useOptimistic";
import { useToggleManager } from "@/hooks/useToggleManager";
import { ConfirmationMenuLayout } from "@/components/MenuLayouts/ConfirmationMenuLayout";
import { useRouter } from "next/navigation";
import { MenuLayoutProps } from "@/lib/types/MenuLayoutProps";
import { ProfileOptionsLayout } from "@/lib/types/ProfileOptiopnsLayouts";
import CompanionList from "@/components/MenuLayouts/CompanionList";
interface ProfileOptionsProps {
  closeOptions: () => void;
  profileData: ProfileProps;
  setProfileData: (
    optimisticValue: (prev: ProfileProps) => ProfileProps,
    trueValue: (prev: ProfileProps) => Promise<ProfileProps>
  ) => Promise<void>;
}

const getFriends = async () => {
  try {
    const response = await fetch("/api/friends");
    if (response.ok) {
      const json = await response.json();
      return json;
    }
  } catch (e) {
    console.error(e);
    return [];
  }
};

export function ProfileMenu<T extends Session>({
  session,
  profileData: pfData,
}: {
  session: T;
  profileData: ProfileProps;
}) {
  const [profileData, setProfileData] = useOptimisticState(pfData);

  const {
    isActive: areOptionsActive,
    setActive: setOptionsActive,
    setInactive: setOptionsInactive,
  } = useToggleManager(false);

  // TODO: transfer optimistic here

  const ref = useClickOutside<HTMLDivElement>(setOptionsInactive);

  return (
    <SessionProvider session={session}>
      <motion.div
        key={areOptionsActive ? "options" : "info"}
        animate={{ rotateX: [0, 90, 0], display: ["none", "block"] }}
        transition={{ duration: 0.2 }}
        ref={areOptionsActive ? ref : undefined}
        className="bg-white rounded-2xl p-4 w-[400px] max-w-[90vw] relative overflow-hidden"
      >
        <div className="flex items-center h-[3.5rem]">
          {areOptionsActive ? (
            <ProfileOptions
              setProfileData={setProfileData}
              profileData={profileData}
              closeOptions={setOptionsInactive}
            />
          ) : (
            <UserInfoMenu
              profileData={profileData}
              openOptions={setOptionsActive}
            />
          )}
        </div>
      </motion.div>
    </SessionProvider>
  );
}

const layoutMap = new Map<
  ProfileOptionsLayout,
  (props?: MenuLayoutProps<ProfileOptionsLayout>) => ReactNode
>([
  [ProfileOptionsLayout.FriendList, (props) => <FriendsList {...props} />],
  [ProfileOptionsLayout.SettingsMenu, (props) => <SettingsMenu {...props} />],
  [
    ProfileOptionsLayout.ScheduleMenu,
    (props) => <ScheduleMenuLayout {...props} />,
  ],
  [
    ProfileOptionsLayout.BlockedUsersMenu,
    (props) => <BlockedUsersMenuLayout {...props} />,
  ],
]);
const currentLayout = (state: ProfileOptionsLayout) => {
  const layout = layoutMap.get(state);
  if (!layout) throw new Error("Uknown layout");
  return layout;
};

interface OwnerProfileOptionsProps
  extends Omit<ProfileOptionsProps, "updateData"> {}
function OwnerProfileOptions({ closeOptions }: OwnerProfileOptionsProps) {
  const [activeLayoutTitle, setActiveLayout] = useState(
    ProfileOptionsLayout.FriendList
  );
  const { MenuWrapper, setMenuActive } = usePopupMenu();

  const setSettingsActive = () => {
    setActiveLayout(ProfileOptionsLayout.SettingsMenu);
    setMenuActive();
  };
  const setFriendListActive = () => {
    setActiveLayout(ProfileOptionsLayout.FriendList);
    setMenuActive();
  };

  const setScheduleMenuActive = () => {
    setActiveLayout(ProfileOptionsLayout.ScheduleMenu);
    setMenuActive();
  };
  const activeLayout = currentLayout(activeLayoutTitle);
  return (
    <MenuWrapper
      title={activeLayoutTitle}
      menuLayout={activeLayout({ setActiveLayout, setMenuActive })}
    >
      <div className="w-full h-full flex">
        <div
          className="bg-white p-2 items-center flex justify-around w-full"
          style={{ transform: "rotateZ()" }}
        >
          <button
            aria-label="Settings"
            className="bg-black p-3 rounded-full"
            onClick={setSettingsActive}
          >
            <SettingsIcon className="w-7 text-white" />
          </button>
          <button
            onClick={setScheduleMenuActive}
            aria-label="Open schedule"
            className="bg-black p-3 rounded-full"
          >
            <CalendarIcon className="w-7 text-white" />
          </button>
          <button
            aria-label="Open friend list"
            className="bg-black p-3 rounded-full"
            onClick={setFriendListActive}
          >
            <UserGroupIcon className="w-7 text-white" />
          </button>
          <button
            aria-label="Close options"
            className="bg-black p-3 rounded-full"
            onClick={closeOptions}
          >
            <ExitIcon className="w-7 text-white" />
          </button>
        </div>
      </div>
    </MenuWrapper>
  );
}
async function removeFriend(id: string) {
  const response = await myFetch(`/api/friends/${id}`, {
    method: "DELETE",
  });
  return response;
}

function FriendsList({}: MenuLayoutProps<ProfileOptionsLayout>) {
  const [friends, setFriends] = useState<Companion[]>([]);
  const [isListReady, setIsListReady] = useState(false);
  useEffect(() => {
    const updateFriendsList = async () => {
      const friends = await getFriends();
      setFriends(friends);
      setIsListReady(true);
    };
    updateFriendsList();
  }, []);

  const handleFriendRemoval = async (friend: Companion) => {
    await removeFriend(friend.id);
    setFriends((prev) => prev.filter((f) => f.id !== friend.id));
  };

  if (!isListReady) {
    return <PopupLoader />;
  }
  if (!friends.length) {
    return <PopupPlaceholder text="No friends yet. Go get em tiger!" />;
  }
  return (
    <UserList
      className="mt-4"
      data={friends}
      actions={[
        {
          action: (friend) => handleFriendRemoval(friend),
          actionDescription: "Remove Friend",
          actionIcon: <RemoveUserIcon />,
          containerClassName: "hover:text-red-300",
        },
        {
          action: () => {},
          actionDescription: "Remove Friend",
          actionIcon: <EnvelopeIcon />,
          containerClassName: "hover:text-green-300",
        },
      ]}
    />
  );
}

async function sendFriendRequest(id: string) {
  if (!id) {
    throw new Error("Something went wrong - profile id is missing");
  }
  const response = await myFetch<{
    mType: "FRIEND_REQUEST";
    from: string;
    to: string;
    id: string;
  }>(`/api/friends/${id}`, {
    method: "POST",
  });
  return response;
}
async function deleteFriendRequest(requestTo: string) {
  const url = new URL(`${process.env.NEXT_PUBLIC_BASE_URL}/api/messages`);
  url.searchParams.append("to", requestTo);
  url.searchParams.append("type", MessageType.FRIEND_REQUEST);

  const response = await myFetch(url, { method: "DELETE" });
  return response;
}
async function muteUser(id: string) {
  const url = new URL(`${process.env.NEXT_PUBLIC_BASE_URL}/api/profile/${id}`);
  url.searchParams.append("opt_name", "mute");
  url.searchParams.append("opt_val", "true");

  const response = await myFetch(url, { method: "POST" });
  return response;
}
async function blockUser(id: string) {
  const url = new URL(`${process.env.NEXT_PUBLIC_BASE_URL}/api/profile/${id}`);
  url.searchParams.append("opt_name", "block");
  url.searchParams.append("opt_val", "true");

  const response = await myFetch(url, { method: "POST" });
  return response;
}
async function unblockUser(id: string) {
  const url = new URL(`${process.env.NEXT_PUBLIC_BASE_URL}/api/profile/${id}`);
  url.searchParams.append("opt_name", "block");
  url.searchParams.append("opt_val", "false");

  const response = await myFetch(url, { method: "POST" });
  return response;
}
async function unmuteUser(id: string) {
  const url = new URL(`${process.env.NEXT_PUBLIC_BASE_URL}/api/profile/${id}`);
  url.searchParams.append("opt_name", "mute");
  url.searchParams.append("opt_val", "false");

  const response = await myFetch(url, { method: "POST" });
  return response;
}

export function ProfileOptions({
  closeOptions,
  profileData,
  setProfileData,
}: ProfileOptionsProps) {
  const session = useSession();

  const user = session.data?.user as any;
  const router = useRouter();
  const toggleIsMuted = () => {
    setProfileData(
      (prev) => ({ ...prev, notificationsOn: !prev.notificationsOn }),
      async (prev) => {
        let response;
        if (prev.notificationsOn) response = await unmuteUser(profileData.id);
        else response = await muteUser(profileData.id);
        if (response.data)
          return {
            ...profileData,
            notificationsOn: !prev.notificationsOn,
          };
        throw Error(response.error!);
      }
    );
  };
  const isUserOwner = user.id === profileData.id;

  const handleFriendRequest = async () => {
    if (profileData.friendRequestSent === null) {
      setProfileData(
        (prev) => ({ ...prev, friendRequestSent: "yes" }),
        async (prev) => {
          const res = await sendFriendRequest(profileData.id);
          if (res.data) return { ...prev, friendRequestSent: res.data.id };
          throw Error(res.error);
        }
      );
      return;
    }
    setProfileData(
      (prev) => ({ ...prev, friendRequestSent: null }),
      async (prev) => {
        const res = await deleteFriendRequest(profileData.id);
        if (res.data) return { ...prev, friendRequestSent: null };
        throw Error(res.error!);
      }
    );
  };
  const handleRemoveFriend = async () => {
    setProfileData(
      (prev) => ({ ...prev, isFriend: false }),
      async (prev) => {
        const response = await removeFriend(profileData.id);
        if (response.error) return prev;
        return { ...prev, isFriend: false };
      }
    );
  };
  if (isUserOwner)
    return (
      <OwnerProfileOptions
        setProfileData={setProfileData}
        profileData={profileData}
        closeOptions={closeOptions}
      />
    );
  const btnStyle = `bg-black p-3 rounded-full hover:bg-neutral-900 active:scale-90  cursor-pointer`;
  const iconStyle = "w-7 text-white hover:bg-neutral-900 active:scale-90";

  const { MenuWrapper, setMenuActive, setMenuInactive } = usePopupMenu();
  const handleBlockUser = async () => {
    const res = await blockUser(profileData.id);
    if (res.data) router.push("/");
  };
  return (
    <MenuWrapper
      title="Confirmation"
      menuLayout={
        <ConfirmationMenuLayout
          onConfirm={handleBlockUser}
          onReject={setMenuInactive}
        >
          <span>Are you sure you want to block</span>
          <span className="font-semibold block">{`${profileData.name}?`}</span>
        </ConfirmationMenuLayout>
      }
    >
      <div className="w-full h-full flex">
        <div
          className="bg-white p-2 items-center flex justify-around w-full"
          style={{ transform: "rotateZ()" }}
        >
          {profileData.isFriend ? (
            <>
              <button
                onClick={handleRemoveFriend}
                aria-label="Remove friend"
                className={btnStyle}
              >
                <TrashCan className={iconStyle} />
              </button>
              <button aria-label="Add friend" className={btnStyle}>
                <EnvelopeIcon className={iconStyle} />
              </button>
            </>
          ) : (
            <>
              <button
                aria-label="Block user"
                className={btnStyle}
                onClick={setMenuActive}
              >
                <NoIcon className={iconStyle} />
              </button>
              <button
                onClick={handleFriendRequest}
                aria-label="Add friend"
                className={`${btnStyle} ${
                  profileData.friendRequestSent != null && "opacity-50"
                }`}
              >
                <AddUserIcon className={iconStyle} />
              </button>
            </>
          )}

          {!isUserOwner && (
            <button
              aria-label={
                profileData.notificationsOn
                  ? "Turn on notifications"
                  : "Turn off notifications"
              }
              className={btnStyle}
              onClick={toggleIsMuted}
            >
              {profileData.notificationsOn ? (
                <NoBellIcon className={iconStyle} />
              ) : (
                <BellIcon className={iconStyle} />
              )}
            </button>
          )}
          <button
            aria-label="Close options"
            className={btnStyle}
            onClick={closeOptions}
          >
            <ExitIcon className="w-7 text-white" />
          </button>
        </div>
      </div>
    </MenuWrapper>
  );
}

interface ProfileProps {
  id: string;
  image: string | null;
  name: string;
  email: string | null;
  isFriend: boolean;
  friendRequestSent: string | null;
  age: number;
  notificationsOn: boolean;
}

interface UserInfoMenuProps {
  openOptions: () => void;
  profileData: ProfileProps;
}
function UserInfoMenu({ openOptions, profileData }: UserInfoMenuProps) {
  return (
    <>
      <div className="rounded-full overflow-hidden mr-4 min-w-[3.5rem] min-h-[3.5rem]">
        <Image
          alt={"profile picture"}
          width={100}
          height={100}
          priority
          src={profileData.image || "/pfp1.jpeg"}
          className="border-white w-14 h-14 max-w-[25vw] max-h-[25vw] bo"
        />
      </div>
      <div>
        <p className="font-bold leading-5 text-lg">{profileData.name}</p>
        {profileData.email && (
          <p className="text-neutral-700">@{profileData.email.split("@")[0]}</p>
        )}
      </div>
      <button className="ml-auto" onClick={openOptions}>
        <DottedPath className="w-7 rotate-90" />
      </button>
    </>
  );
}
function SettingsMenu({
  setActiveLayout,
}: MenuLayoutProps<ProfileOptionsLayout>) {
  return (
    <div className="text-white mt-4 mb-4">
      <ul>
        <li className="p-2">
          <button
            className="flex"
            onClick={() => {
              setActiveLayout &&
                setActiveLayout(ProfileOptionsLayout.BlockedUsersMenu);
            }}
          >
            <NoIcon className="mr-4 w-6 h-6" />
            <span>Blocked users</span>
          </button>
        </li>
        {/* <li className="p-2">
          <button className="flex" onClick={() => {}}>
            <NoIcon className="mr-4 w-6 h-6" />
            <span>Blocked users</span>
          </button>
        </li> */}
      </ul>
    </div>
  );
}

async function getBlockedUsers() {
  const url = new URL(`${process.env.NEXT_PUBLIC_BASE_URL}/api/profile`);
  url.searchParams.append("blocked_only", "true");
  return await myFetch<Companion[]>(url);
}

function BlockedUsersMenuLayout({
  setActiveLayout,
}: MenuLayoutProps<ProfileOptionsLayout>) {
  const [blockedUsers, setBlockedUsers] = useOptimisticState<Companion[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const handleGetBlockedProfiles = async () => {
    const response = await getBlockedUsers();
    if (response.error) {
      setIsLoading(false);
      setError(error);
      return [];
    }
    setIsLoading(false);
    setError(null);
    return response.data!;
  };
  const handleUnblockUser = async (comp: Companion) => {
    setBlockedUsers(
      (prev) => prev.filter((x) => x.id !== comp.id),
      async (prev) => {
        const response = await unblockUser(comp.id);
        if (response.error) {
          setError(response.error);
          return prev;
        }
        return prev.filter((x) => x.id !== comp.id);
      }
    );
  };
  useEffect(() => {
    setBlockedUsers(() => [], handleGetBlockedProfiles);
  }, []);

  if (isLoading) return <PopupLoader />;

  if (error !== null)
    return (
      <div>
        <p>Something went wrong. Please try again</p>
        <button>Retry</button>
      </div>
    );
  if (blockedUsers.length === 0)
    return (
      <div className="flex justify-center min-h-[300px] items-center">
        <p className="font-bold text-neutral-200 mb-4">
          Everything seems clear
        </p>
      </div>
    );
  return (
    <CompanionList
      data={blockedUsers}
      actionIcon={<RemoveUserIcon />}
      actionDescription="Unblock user"
      action={handleUnblockUser}
    />
  );
}
