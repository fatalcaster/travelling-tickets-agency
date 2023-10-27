import { ArrowIcon } from "@/components/Icons";
import Image from "next/image";
import { authOptions } from "../../api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth/next";
import { Companion } from "@/lib/types/Companion";
import Link from "next/link";
import { ProfileMenu } from "./Options";
import { getProfile } from "@/lib/services/user-service";

export default async function Home({ params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  // const profileData = await getProfileData(params.id);

  const profileData = await getProfile(session!.user!.id!, params.id);

  if (!profileData) return <div>Not found</div>;
  return (
    <main className="flex flex-col items-center py-2 max-w-screen-2xl gap-2 p-2">
      <div className="flex items-center gap-4 w-full max-w-[90vw]">
        <div className="bg-black flex p-4 rounded-2xl w-full items-center">
          <Link href={"/"} className="w-11 h-11 rounded-full flex mr-2">
            <ArrowIcon direction="left" className="w-8 text-neutral-500" />
          </Link>
          <input
            autoFocus={true}
            className="rounded-2xl bg-neutral-800 pl-4 h-10 w-full text-neutral-200 focus:outline-teal-700"
            placeholder="Search..."
          />
        </div>
      </div>
      <ProfileMenu profileData={profileData} session={session!} />
      <div className="bg-white flex items-center rounded-2xl p-4 w-[400px] max-w-[90vw]">
        <span className="mr-4 text-xl">🇺🇸 🇫🇷</span>
        <span className="">Paris, France</span>
        <span className="ml-auto font-bold">{profileData.age} yrs </span>
      </div>
      <div className="flex justify-center px-4 py-2 bg-black rounded-2xl flex-col w-full max-w-[90vw]">
        <h2 className="text-white text-center font-semibold pb-2">Badges</h2>
        <div className=" w-full  grid grid-cols-4 gap-4 ">
          <div className="w-16 h-16 rounded-full bg-neutral-800"></div>
          <div className="w-16 h-16 rounded-full bg-neutral-800"></div>
          <div className="w-16 h-16 rounded-full bg-neutral-800"></div>
          <div className="w-16 h-16 rounded-full bg-neutral-800"></div>
        </div>
        <button className="text-neutral-400 mt-2 hover:underline active:text-white">
          View all
        </button>
      </div>
      <div
        style={{ maxWidth: "min(90vw, 400px)" }}
        className="bg-white rounded-2xl max-w-[90vw] px-4 py-2 w-full flex flex-col"
      >
        <div className="flex">
          <div className="rounded-full  overflow-hidden bg-white p-2">
            <Image
              alt="logo"
              src={"/google.svg"}
              className="w-10 h-10"
              width={50}
              height={50}
            />
          </div>
          <div className="bg-white w-full p-2 flex relative">
            <p className="bg-white">Johnatan has conquered yet another land!</p>
          </div>
        </div>
        <div className="w-full h-full overflow-hidden rounded-b-2xl max-h-[30vh]">
          <Image
            src="/post1.jpg"
            width={400}
            height={400}
            alt="post"
            className=" object-cover w-full "
          />
        </div>
        <p className="ml-auto text-sm mt-1 mr-2 text-neutral-600">24/07/2023</p>
      </div>
    </main>
  );
}
