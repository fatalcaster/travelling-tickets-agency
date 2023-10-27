import { LuggageIcon } from "@/components/Icons";
import { type SearchProps, getVisitOffers } from "@/lib/services/visit-service";

async function getVisitData(base64encodedParams: string) {
  const json = JSON.parse(atob(base64encodedParams)) as SearchProps;
  const data = await getVisitOffers(json);
  return data;
}

export default async function Home({
  searchParams,
}: {
  params: string;
  searchParams?: { [key: string]: string | undefined };
}) {
  if (!searchParams || !searchParams["params"])
    return <div>Something went wrong</div>;
  const data = await getVisitData(searchParams["params"]);
  console.log("DATA", data);
  return (
    <main className="flex flex-col items-center justify-center max-w-screen-2xl gap-4 w-full p-2 whitespace-pre">
      <ul className="flex flex-col list-none gap-4 lg:w-[40%]">
        <li className="flex flex-col bg-white px-3 py-3 rounded-2xl justify-center items-center relative">
          <p className="text-neutral-400 text-xs absolute top-[9%]">4h 20min</p>
          <div className="flex justify-center items-center">
            <p className="bg-teal-700 py-2 px-3 flex justify-center items-center text-white rounded-3xl text-sm">
              6:05<span>am</span>
            </p>
            <hr className=" lg:w-96 w-44 h-px  bg-gray-200 border-0"></hr>

            <p className="bg-teal-700 py-2 px-3 flex justify-center items-center text-white rounded-3xl text-sm">
              12:48<span>pm</span>
            </p>
          </div>
          <button className="bg-neutral-200 px-2 py-1 text-xs rounded-3xl absolute top-[26%] lg:text-sm lg:px-3">
            Direct Flight
          </button>
          <div className="flex justify-between w-full mt-1">
            <div className="flex flex-col  ">
              <p className="text-sm  text-neutral-500 ">Belgrade</p>
              <p className="text-xs  text-neutral-400 truncate max-w-[15ch] lg:max-w-full">
                Nikola Tesla
              </p>
            </div>
            <div className="flex flex-col text-right">
              <p className="text-sm text-neutral-500 ">Paris</p>
              <p className="text-xs text-neutral-400 truncate max-w-[15ch] lg:max-w-full">
                Charles de Gaulle
              </p>
            </div>
          </div>
          <button className="bg-black text-white text-xs font-medium px-3 py-1 flex justify-center items-center rounded-3xl absolute top-[57%] lg:text-sm lg:px-4 ">
            123 $
          </button>
          <div className="group flex justify-between w-full mt-2 relative">
            <p className="opacity-0  duration-300 group-hover:opacity-80  p-2 rounded-2xl absolute -bottom-[90%] left-[5%] text-xs bg-neutral-400 text-neutral-700">
              10 kg
            </p>
            <div className="flex relative">
              <LuggageIcon className="w-5 h-5 lg:w-6 lg:h-6 fill-neutral-400 ml-1" />
              <p className=" text-neutral-400 text-xs absolute left-[110%] bottom-0">
                10kg
              </p>
            </div>
            {/* <div className="flex gap-1 justify-center items-center">
              <StarIcon className="w-7 h-7  text-neutral-400" />
              <SquareArrow className="w-7 h-7  text-neutral-400" />
            </div> */}
            <p className="text-teal-700 text-xs">Economy</p>
          </div>
        </li>
        <li className="flex flex-col bg-white px-3 py-3 rounded-2xl justify-center items-center relative">
          <p className="text-neutral-400 text-xs absolute top-[9%]">1h 53min</p>
          <div className="flex justify-center items-center">
            <p className="bg-teal-700 py-2 px-3 flex justify-center items-center text-white rounded-3xl text-sm">
              17:05<span>am</span>
            </p>
            <hr className=" lg:w-96  w-40 h-px  bg-gray-200 border-0"></hr>

            <p className="bg-teal-700 py-2 px-3 flex justify-center items-center text-white rounded-3xl text-sm">
              18:48<span>pm</span>
            </p>
          </div>
          <button className="bg-neutral-200 px-2 py-1 text-xs rounded-3xl absolute top-[26%] lg:text-sm lg:px-3 ">
            Direct Flight
          </button>
          <div className="flex justify-between w-full mt-1">
            <div className="flex flex-col ">
              <p className="text-sm  text-neutral-500 ">London</p>
              <p className="text-xs  text-neutral-400 truncate max-w-[15ch] lg:max-w-full">
                Heatrow
              </p>
            </div>
            <div className="flex flex-col text-right ">
              <p className="text-sm text-neutral-500 ">Belgrade</p>
              <p className="text-xs text-neutral-400 truncate max-w-[15ch] lg:max-w-full">
                Nikola Tesla
              </p>
            </div>
          </div>
          <button className="bg-black text-white text-xs font-medium px-3 py-1 rounded-3xl flex justify-center items-center absolute top-[57%] lg:text-sm lg:px-4">
            54 $
          </button>
          <div className="group flex justify-between w-full mt-2 relative">
            <LuggageIcon className="w-5 h-5 lg:w-6 lg:h-6 fill-neutral-400 ml-1" />
            <p className="opacity-0  duration-300 group-hover:opacity-80  p-2 rounded-2xl absolute -bottom-[90%] left-[5%] text-xs bg-neutral-400 text-neutral-700">
              10 kg
            </p>
            {/* <div className="flex gap-1 justify-center items-center">
              <StarIcon className="w-7 h-7" />
              <SquareArrow className="w-7 h-7" />
            </div> */}
            <p className="text-yellow-500 text-xs">First</p>
          </div>
        </li>
        <li className="flex flex-col bg-white px-3 py-3 rounded-2xl justify-center items-center relative">
          <p className="text-neutral-400 text-xs absolute top-[9%]">2h 20min</p>
          <div className="flex justify-center items-center">
            <p className="bg-teal-700 py-2 px-3 flex justify-center items-center text-white rounded-3xl text-sm">
              13:20<span>am</span>
            </p>
            <hr className="  lg:w-96 w-40 h-px  bg-gray-200 border-0"></hr>

            <p className="bg-teal-700 py-2 px-3 flex justify-center items-center text-white rounded-3xl text-sm">
              15:40<span>pm</span>
            </p>
          </div>
          <button className="bg-neutral-200 px-2 py-1 text-xs rounded-3xl absolute top-[28%] lg:text-sm lg:px-3 ">
            Direct Flight
          </button>
          <div className="flex justify-between w-full mt-1 ">
            <div className="flex flex-col ">
              <p className="text-sm  text-neutral-500 ">Dubai</p>
              <p className="text-xs  text-neutral-400 truncate max-w-[15ch] lg:max-w-full">
                Dubai International Airport
              </p>
            </div>
            <div className="flex flex-col text-right ">
              <p className="text-sm text-neutral-500 ">Moscow</p>
              <p className="text-xs text-neutral-400 truncate max-w-[15ch] lg:max-w-full">
                Sheremetyevo
              </p>
            </div>
          </div>
          <button className="bg-black text-white text-xs flex justify-center items-center font-medium px-3 py-1 rounded-3xl absolute top-[57%] lg:text-sm lg:px-4">
            1045 $
          </button>
          <div className="group flex justify-between w-full mt-2 relative">
            <LuggageIcon className="w-5 h-5 lg:w-6 lg:h-6 fill-neutral-400 ml-1" />
            <p className="opacity-0  duration-300 group-hover:opacity-80  p-2 rounded-2xl absolute -bottom-[90%] left-[5%] text-xs bg-neutral-400 text-neutral-700">
              10 kg
            </p>
            {/* <div className="flex gap-1 justify-center items-center">
              <StarIcon className="w-7 h-7" />
              <SquareArrow className="w-7 h-7" />
            </div> */}
            <p className="text-yellow-500 text-xs">First</p>
          </div>
        </li>
        <li className="flex flex-col bg-white px-3 py-3 rounded-2xl justify-center items-center relative">
          <p className="text-neutral-400 text-xs absolute top-[9%]">2h 20min</p>
          <div className="flex justify-center items-center">
            <p className="bg-teal-700 py-2 px-3 flex justify-center items-center text-white rounded-3xl text-sm">
              13:20<span>am</span>
            </p>
            <hr className="  lg:w-96 w-40 h-px  bg-gray-200 border-0"></hr>

            <p className="bg-teal-700 py-2 px-3 flex justify-center items-center text-white rounded-3xl text-sm">
              15:40<span>pm</span>
            </p>
          </div>
          <button className="bg-neutral-200 px-2 py-1 text-xs rounded-3xl absolute top-[28%] lg:text-sm lg:px-3 ">
            Direct Flight
          </button>
          <div className="flex justify-between w-full mt-1 ">
            <div className="flex flex-col ">
              <p className="text-sm  text-neutral-500 ">Dubai</p>
              <p className="text-xs  text-neutral-400 truncate max-w-[15ch] lg:max-w-full">
                Dubai International Airport
              </p>
            </div>
            <div className="flex flex-col text-right ">
              <p className="text-sm text-neutral-500 ">Moscow</p>
              <p className="text-xs text-neutral-400 truncate max-w-[15ch] lg:max-w-full">
                Sheremetyevo
              </p>
            </div>
          </div>
          <button className="bg-black text-white text-xs flex justify-center items-center font-medium px-3 py-1 rounded-3xl absolute top-[57%] lg:text-sm lg:px-4">
            1045 $
          </button>
          <div className="group flex justify-between w-full mt-2 relative">
            <p className="opacity-0  duration-300 group-hover:opacity-80  p-2 rounded-2xl absolute -bottom-[90%] left-[5%] text-xs bg-neutral-400 text-neutral-700">
              10 kg
            </p>
            <div className="flex relative">
              <LuggageIcon className="w-5 h-5 lg:w-6 lg:h-6 fill-neutral-400 ml-1" />
              <p className=" text-neutral-400 text-xs absolute left-[110%] bottom-0">
                10kg
              </p>
            </div>
            {/* <div className="flex gap-1 justify-center items-center">
              <StarIcon className="w-7 h-7" />
              <SquareArrow className="w-7 h-7" />
            </div> */}
            <p className="text-red-600 text-xs">Business</p>
          </div>
        </li>
        <li className="flex flex-col bg-white px-3 py-3 rounded-2xl justify-center items-center relative">
          <p className="text-neutral-400 text-xs absolute top-[9%]">2h 20min</p>
          <div className="flex justify-center items-center">
            <p className="bg-teal-700 py-2 px-3 flex justify-center items-center text-white rounded-3xl text-sm">
              13:20<span>am</span>
            </p>
            <hr className="  lg:w-96 w-40 h-px  bg-gray-200 border-0"></hr>

            <p className="bg-teal-700 py-2 px-3 flex justify-center items-center text-white rounded-3xl text-sm">
              15:40<span>pm</span>
            </p>
          </div>
          <button className="bg-neutral-200 px-2 py-1 text-xs rounded-3xl absolute top-[28%] lg:text-sm lg:px-3 ">
            Direct Flight
          </button>
          <div className="flex justify-between w-full mt-1 ">
            <div className="flex flex-col ">
              <p className="text-sm  text-neutral-500 ">Dubai</p>
              <p className="text-xs  text-neutral-400 truncate max-w-[15ch] lg:max-w-full">
                Dubai International Airport
              </p>
            </div>
            <div className="flex flex-col text-right ">
              <p className="text-sm text-neutral-500 ">Moscow</p>
              <p className="text-xs text-neutral-400 truncate max-w-[15ch] lg:max-w-full">
                Sheremetyevo
              </p>
            </div>
          </div>
          <button className="bg-black text-white text-xs flex justify-center items-center font-medium px-3 py-1 rounded-3xl absolute top-[57%] lg:text-sm lg:px-4">
            1045 $
          </button>
          <div className="group flex justify-between items-center w-full mt-2 relative">
            <LuggageIcon className="w-5 h-5 lg:w-6 lg:h-6 fill-neutral-400 ml-1" />
            <p className="opacity-0  duration-300 group-hover:opacity-80  p-2 rounded-2xl absolute -bottom-[90%] left-[5%] text-xs bg-neutral-400 text-neutral-700">
              10 kg
            </p>
            {/* <div className="flex gap-1 justify-center items-center">
              <StarIcon className="w-7 h-7" />
              <SquareArrow className="w-7 h-7" />
            </div> */}
            <p className="text-teal-700 text-xs">Economy</p>
          </div>
        </li>
      </ul>
    </main>
  );
}
