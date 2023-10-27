import { StayType, TicketClass } from "@/lib/types/TravelSearchParams";
import { create } from "zustand";

interface TravelPreferencesState {
  ticketClass: TicketClass;
  numOfChildren: number;
  isRoundTrip: boolean;
  hotelType: StayType;
  directFlight: boolean;
  setRoundTrip: () => void;
  setOneWayTrip: () => void;
  setEconomyClass: () => void;
  setBusinessClass: () => void;
  setFirstClass: () => void;
  setStayType: (type: StayType) => void;
  setNumberOfChildren: (num: number) => void;
  incrementNumberOfChildren: () => void;
  decrementNumberOfChildren: () => void;
}

const initialState = {
  ticketClass: TicketClass.Economy,
  numOfChildren: 0,
  isRoundTrip: true,
  hotelType: StayType.BestValue,
  directFlight: false,
};

export const useTravelPreferencesStore = create<TravelPreferencesState>(
  (set) => ({
    ticketClass: initialState.ticketClass,
    numOfChildren: initialState.numOfChildren,
    isRoundTrip: initialState.isRoundTrip,
    directFlight: initialState.directFlight,
    hotelType: initialState.hotelType,
    setRoundTrip: () => set(() => ({ isRoundTrip: true })),
    setOneWayTrip: () => set(() => ({ isRoundTrip: false })),
    setEconomyClass: () => set(() => ({ ticketClass: TicketClass.Economy })),
    setBusinessClass: () => set(() => ({ ticketClass: TicketClass.Business })),
    setFirstClass: () => set(() => ({ ticketClass: TicketClass.First })),
    setStayType: (type) => set(() => ({ hotelType: type })),
    setNumberOfChildren: (num: number) =>
      set(() => ({ numOfChildren: Math.max(0, num) })),
    incrementNumberOfChildren: () =>
      set((state) => ({ numOfChildren: state.numOfChildren + 1 })),
    decrementNumberOfChildren: () =>
      set((state) => ({ numOfChildren: Math.max(state.numOfChildren - 1, 0) })),
  })
);
