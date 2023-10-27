"use client";

import { DottedPath, PlusIcon, SearchIcon } from "@/components/Icons";
import Image from "next/image";
import {
  ButtonHTMLAttributes,
  CSSProperties,
  DetailedHTMLProps,
  ReactNode,
  useContext,
  useState,
} from "react";
import { motion } from "framer-motion";
import { useClickOutside } from "@/hooks/hooks";
import { useSearchSuggestions } from "@/hooks/useSearchSuggestions";
import { usePopupMenu } from "@/hooks/usePopupMenu";
import { Companion } from "@/lib/types/Companion";
import { useToggleManager } from "@/hooks/useToggleManager";

import { PendingInvites } from "./PendingInvites";
import { ProfileIcon } from "@/components/ProfileIcon";
import dynamic from "next/dynamic";
import { SessionProvider, useSession } from "next-auth/react";
import { PopupLoader } from "@/components/MenuLayouts/PopupLoader";
import myFetch from "@/lib/utils/myFetch";
import { isMobile } from "@/lib/utils/is-mobile";
import type { Session } from "next-auth";
import Link from "next/link";
import { useCompanionStore } from "@/store/useCompanionStore";
enum MenuLayout {
  Companions = "Companions",
  Login = "Adventure awaits, explore a new way of travelling!",
  Info = "Info",
  None = "",
}
interface TravellersMenuProps extends UserBarProps {
  isSearchActive: boolean;
  setSearchInactive: () => void;
  setSearchActive: () => void;
}

interface UserBarProps {
  providers: any;
  csrfToken?: string;
  session: Session | null;
}

export function UserBar({ csrfToken, providers, session }: UserBarProps) {
  const {
    isActive: isSearchActive,
    setActive: setSearchActive,
    setInactive: setSearchInactive,
  } = useToggleManager();

  const { MenuWrapper, setMenuActive } = usePopupMenu();
  return (
    <SessionProvider>
      <div className="flex items-center gap-2 w-full">
        {!isSearchActive && session?.user && (
          <PendingInvites openMailbox={setMenuActive} />
        )}
        <MenuWrapper menuLayout={<MailBoxMenuLayout />} title={"Inbox"}>
          <TravellersMenu
            session={session}
            isSearchActive={isSearchActive}
            setSearchActive={setSearchActive}
            setSearchInactive={setSearchInactive}
            csrfToken={csrfToken}
            providers={providers}
          />
        </MenuWrapper>
      </div>
    </SessionProvider>
  );
}

const MailBoxMenuLayout = dynamic(
  () => import("../components/MenuLayouts/MailBoxMenuLayout"),
  {
    ssr: true,
    loading: () => <PopupLoader />,
  }
);

function useTravellersMenuLayoutManager({
  auth,
  onMenuActivated,
  companions,
}: {
  auth: {
    session: Session | null;
    providers: any;
    csrfToken: string | undefined;
  };
  onMenuActivated?: () => void;
  companions: {
    data: Companion[];
    onDelete: (comp: Companion) => void;
  };
}) {
  const [activeMenuLayout, setActiveMenuLayout] = useState<MenuLayout>(
    MenuLayout.None
  );

  const setMenuLayout = (layout: MenuLayout) => {
    setActiveMenuLayout(layout);
    if (layout !== MenuLayout.None && onMenuActivated) {
      onMenuActivated();
    }
  };
  const menuLayout: () => {
    style?: CSSProperties;
    menuLayout: ReactNode;
    className?: string;
  } = () => {
    if (activeMenuLayout === MenuLayout.Companions)
      return {
        menuLayout: (
          <CompanionMenuLayout
            data={companions.data}
            onDelete={companions.onDelete}
          />
        ),
      };
    if (activeMenuLayout === MenuLayout.Login)
      return {
        menuLayout: (
          <LoginMenuLayout
            providers={auth.providers}
            csrfToken={auth.csrfToken}
          />
        ),
      };
    if (activeMenuLayout === MenuLayout.Info)
      return {
        menuLayout: <InfoMenuLayout user={auth.session!.user!} />,
        className: "max-w-[350px]",
      };
    return { menuLayout: <></> };
  };
  const setLoginLayout = () => {
    setMenuLayout(MenuLayout.Login);
  };
  const setCompanionLayout = () => {
    setMenuLayout(MenuLayout.Companions);
  };
  const setInfoLayout = () => {
    setMenuLayout(MenuLayout.Info);
  };
  return {
    setCompanionLayout,
    setInfoLayout,
    setLoginLayout,
    activeMenuLayout,
    menuLayout,
  };
}
interface DefaultMenuProps {
  onUserClick: () => void;
  user: Companion;
  onPlusClick: () => void;
  onSignIn: () => void;
  onOptionsClick: () => void;
  companions: Companion[];
}

function DefaultMenu({
  user,
  onUserClick,
  onPlusClick,
  onOptionsClick,
  onSignIn,
  companions,
}: DefaultMenuProps) {
  return (
    <>
      <p className="text-white text-xl font-extrabold p-0 ml-2 flex items-center">
        <span>nomon</span>
        <Image
          src="/logo.webp"
          width={55}
          height={55}
          alt="w"
          className="relative -left-4"
        />
      </p>
      {user ? (
        <div className="flex items-center ml-auto">
          <button
            aria-label="Add companion"
            className="bg-white rounded-lg p-1.5 mr-2 aspect-square flex items-center justify-center"
            onClick={onPlusClick}
          >
            <PlusIcon className="text-black w-6 h-6" />
          </button>
          <div className="flex items-center">
            <button
              aria-label="View companions"
              className="relative min-w-[5rem] flex items-center"
              onClick={onUserClick}
            >
              <ProfileIcon
                priority={true}
                src={user.image || ""}
                className={`h-12 w-12 ${!companions.length && "translate-x-5"}`}
              />
              {companions.length !== 0 && (
                <ProfileIcon
                  src={companions[0].image}
                  className="inset-0 absolute left-[30%] h-12 w-12"
                />
              )}

              <div className="absolute px-1 top-0 left-[70%] whitespace-nowrap m-auto h-fit rounded-full bg-white text-center text-sm">
                {companions.length > 1 && `${companions.length - 1}+`}
              </div>
            </button>
            <button aria-label="Info menu" onClick={onOptionsClick}>
              <DottedPath
                className="text-white w-6 rotate-90"
                strokeWidth={3}
              />
            </button>
          </div>
        </div>
      ) : (
        <div className="flex items-center ml-auto">
          <button
            className="bg-white py-2 px-4 rounded-2xl hover:underline active:scale-90"
            onClick={onSignIn}
          >
            Sign in
          </button>
        </div>
      )}
    </>
  );
}

export function TravellersMenu({
  session,
  providers,
  csrfToken,
  setSearchActive,
  setSearchInactive,
  isSearchActive,
}: TravellersMenuProps) {
  const user = session?.user as Companion;

  const { companions, addCompanion, removeCompanion } = useCompanionStore();
  const ref = useClickOutside<HTMLDivElement>(setSearchInactive);

  const { MenuWrapper, setMenuActive } = usePopupMenu();

  console.log(user, session);

  const {
    activeMenuLayout,
    menuLayout,
    setCompanionLayout,
    setInfoLayout,
    setLoginLayout,
  } = useTravellersMenuLayoutManager({
    auth: { session, providers, csrfToken },
    onMenuActivated: () => {
      setSearchInactive();
      setMenuActive();
    },
    companions: {
      data: companions,
      onDelete: removeCompanion,
    },
  });

  return (
    <MenuWrapper title={activeMenuLayout} {...menuLayout()}>
      <div
        ref={ref}
        className="rounded-2xl bg-black flex-col items-center justify-between py-2 px-4 relative w-full"
      >
        {isSearchActive && isMobile() && (
          <SearchMenu
            actionDescription="Add companion"
            key="search"
            action={addCompanion}
            onClose={setSearchInactive}
          />
        )}
        <div className="flex w-full mr-10">
          {isSearchActive && !isMobile() ? (
            <SearchMenu
              actionDescription="Add companion"
              key="search"
              action={addCompanion}
              onClose={setSearchInactive}
            />
          ) : (
            <DefaultMenu
              companions={companions}
              onOptionsClick={setInfoLayout}
              onPlusClick={setSearchActive}
              onSignIn={setLoginLayout}
              onUserClick={setCompanionLayout}
              user={user}
            />
          )}
        </div>
      </div>
    </MenuWrapper>
  );
}

const InfoMenuLayout = dynamic(
  () => import("./../components/MenuLayouts/InfoMenuLayout"),
  {
    loading: () => <PopupLoader />,
  }
);

const LoginMenuLayout = dynamic(
  () => import("./../components/MenuLayouts/LoginMenuLayout"),
  {
    loading: () => <PopupLoader />,
  }
);

const CompanionMenuLayout = dynamic(
  () => import("./../components/MenuLayouts/CompanionMenuLayout"),
  {
    loading: () => <PopupLoader />,
  }
);

async function getMatchingProfiles(match: string) {
  return await myFetch<Companion[]>(
    `/api/profile?search=${encodeURIComponent(match)}`
  );
}
interface SearchMenuProps {
  onClose: () => void;
  action: (new_comp: Companion) => void;
  actionDescription?: string;
}
function SearchMenu({ onClose, action, actionDescription }: SearchMenuProps) {
  const { inputValue, handleChange, error, suggestions } =
    useSearchSuggestions<Companion>(getMatchingProfiles);
  const searchProfilesLink = new URL(
    `${process.env.NEXT_PUBLIC_BASE_URL}/profile`
  );
  searchProfilesLink.searchParams.append("search", inputValue);

  return (
    <motion.div
      initial={{ y: 100, zIndex: -1, opacity: 0 }}
      animate={{ y: 0, zIndex: 20, opacity: 1 }}
      className="rounded-2xl bg-black p-2 w-full top-0 left-0"
    >
      <div className="relative">
        <Link
          href={searchProfilesLink}
          className="absolute right-0 w-1/6 max-w-[4rem] items-center justify-center flex bg-teal-800 h-full rounded-r-2xl"
        >
          <SearchIcon stroke={2} className="text-white w-6" />
        </Link>
        <input
          value={inputValue}
          onChange={handleChange}
          autoFocus={true}
          className="rounded-2xl bg-neutral-800 pl-4 h-10 w-full text-neutral-200 focus:outline focus:outline-1 focus:outline-teal-700"
          placeholder="Search..."
        />
      </div>

      {error && (
        <div className="rounded-2xl top-[105%] bg-black w-full px-6 py-2 absolute flex left-0 items-center text-red-400 justify-centerh-full">
          <p className="w-full">{error}</p>
        </div>
      )}

      {inputValue.length > 2 && (
        <div className="absolute bg-black rounded-b-2xl w-full left-0 z-40 top-[85%]">
          {suggestions && suggestions.length !== 0 && (
            <CompanionList
              actionIcon={<PlusIcon className="w-6 h-6 " />}
              className=" px-4 pb-2"
              data={suggestions}
              actionDescription={actionDescription}
              action={(comp: Companion) => {
                action(comp);
                onClose();
              }}
            />
          )}
          {/* TODO: is loaded */}
          {suggestions && suggestions?.length === 0 && (
            <p className="text-neutral-500 flex justify-between px-8 py-2">
              <span>No friends with that name</span>
              <Link href={searchProfilesLink} className="underline">
                <span className="hidden md:block ">See all profiles</span>
                <span className="md:hidden">See all</span>
              </Link>
            </p>
          )}
        </div>
      )}
    </motion.div>
  );
}

const CompanionList = dynamic(
  () => import("./../components/MenuLayouts/CompanionList"),
  {
    loading: () => <PopupLoader />,
  }
);
