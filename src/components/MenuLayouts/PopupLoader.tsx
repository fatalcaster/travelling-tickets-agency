import Image from "next/image";

export function PopupLoader() {
    return (
      <div className="h-[30vh] flex items-center flex-col justify-center text-neutral-300 pb-[20%] font-bold">
        <Image
          src="/loader.svg"
          alt="Loading..."
          width={200}
          height={100}
          priority
          className="w-20"
        />
        <span>Loading...</span>
      </div>
    );
  }