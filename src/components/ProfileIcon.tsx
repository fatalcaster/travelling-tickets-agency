import Image from "next/image";
import Link from "next/link";

export interface ProfileIconProps {
  src: string;
  className?: string;
  id?: string;
  priority?: boolean;
}

export function ProfileIcon({
  src,
  id,
  className,
  priority = false,
}: ProfileIconProps) {
  if (!id)
    return (
      <div
        className={`${className} rounded-full  border-2 border-black overflow-hidden `}
      >
        <Image
          src={src}
          alt="acc"
          width={55}
          height={55}
          className=""
          priority={priority}
        />
      </div>
    );
  if (id)
    return (
      <Link href={`/profile/${id}`}>
        <div
          className={`${className} rounded-full  border-2 border-black overflow-hidden `}
        >
          <Image
            src={src}
            alt="acc"
            width={55}
            height={55}
            className=""
            priority={priority}
          />
        </div>
      </Link>
    );
}
