import myFetch, { IMyFetchResponse } from "@/lib/utils/myFetch";
import { ChangeEvent, useRef, useState } from "react";

// async function fetchData<T>(cb: () => Promise<Response>) {
//   try {
//     const response = await cb();
//     if (response.status === 404) throw new Error("Not found");
//     const json = await response.json();
//     if (json.length === 0) throw new Error("Not found");
//     return { error: null, data: json };
//   } catch (e: any) {
//     if ((e as Error).message === "Not found")
//       return { error: "Not found", data: [] };
//     return { error: "Couldn't get, an error occured", data: [] };
//   }
// }

export function useSearchSuggestions<T>(
  _fetch: (search: string) => Promise<IMyFetchResponse<T[]>>
): TuseSearchSuggestionsReturn<T> {
  const [suggestions, setSuggestions] = useState<T[] | null>([]);
  const [inputValue, setInputValue] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const search = e.target.value;
    setInputValue(search);
    if (search.length > 2) {
      const response = await _fetch(search);
      setSuggestions(response.data);
      setError(response.error);
    }
  };

  return {
    handleChange,
    suggestions,
    inputValue,
    error,
  } as TuseSearchSuggestionsReturn<T>;
}
type TuseSearchSuggestionsReturn<T> =
  | {
      handleChange: (e: ChangeEvent<HTMLInputElement>) => Promise<void>;
      suggestions: T[];
      inputValue: string;
      error: null;
    }
  | {
      handleChange: (e: ChangeEvent<HTMLInputElement>) => Promise<void>;
      suggestions: null;
      inputValue: string;
      error: string;
    };
