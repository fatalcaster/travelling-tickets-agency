import Link from "next/link";
import {
  DocumentIcon,
  ExitIcon,
  LockIcon,
  QuestionMarkIcon,
  UserIcon,
} from "../Icons";
import { signIn, signOut } from "next-auth/react";
import { DefaultSession } from "@/types";
interface InfoMenuProps {
  user: DefaultSession["user"];
}

export default function InfoMenuLayout({user}: InfoMenuProps) {
  return (
    <div className="text-white mt-4 mb-4">
      <ul>
        <li className="p-2  border-b border-neutral-800 my-2">
          <Link href={`/profile/${user?.id}`} className="flex items-center">
            <UserIcon className="mr-4 w-6 h-6" />
            <span>My Profile</span>
          </Link>
        </li>
        <li className="p-2  border-b border-neutral-800 my-2">
          <Link href="/privacy" className="flex items-center">
            <LockIcon className="mr-4 w-6 h-6" />
            <span>Privacy</span>
          </Link>
        </li>
        <li className="p-2  border-b border-neutral-800 my-2">
          <Link href="/terms" className="flex items-center">
            <DocumentIcon className="mr-4 w-6 h-6" />
            <span>Terms</span>
          </Link>
        </li>
        <li className="p-2 border-b border-neutral-800 my-2">
          <Link href="/terms" className="flex items-center">
            <QuestionMarkIcon className="mr-4 w-6 h-6" />
            <span>About</span>
          </Link>
        </li>
        <li className="p-2">
          <button className="flex" onClick={() => signOut()}>
            <ExitIcon className="mr-4 w-6 h-6" />
            <span>Sign out</span>
          </button>
        </li>
      </ul>
    </div>
  );
}
