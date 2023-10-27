import { Companion } from "@/lib/types/Companion";
import { create } from "zustand";

interface CompanionStateProps {
  companions: Companion[];
  removeCompanion: (comp: Companion) => void;
  addCompanion: (comp: Companion) => void;
}
const initialState = { companions: [] as Companion[] };

export const useCompanionStore = create<CompanionStateProps>((set) => ({
  companions: initialState.companions,
  addCompanion: (comp: Companion) =>
    set((state) => {
      if (state.companions.findIndex((c) => c.id === comp.id) === -1)
        return { companions: [...state.companions, comp] };
      return {};
    }),
  removeCompanion: (comp: Companion) =>
    set((state) => ({
      companions: state.companions.filter((c) => c.id !== comp.id),
    })),
}));
