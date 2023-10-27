import { ILocation } from "@/lib/types/Location";
import { create } from "zustand";

interface LocationStoreProps {
  location: ILocation | null;
  setLocation: (loc: ILocation) => void;
  errorMsg: string | null;
  setErrorMsg: (errMsg: string | null) => void;
}

export const useLocationStore = create<LocationStoreProps>((set) => ({
  location: null,
  errorMsg: null,
  setErrorMsg: (err: string | null) => set(() => ({ errorMsg: err })),
  setLocation: (loc: ILocation) => set(() => ({ location: loc })),
}));
