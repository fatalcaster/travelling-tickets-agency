// import { Companion } from "@/lib/types/Companion";
// import { ReactNode, createContext } from "react";

// export const CompanionContext = createContext<{
//   addCompanion: (comp: Companion) => void;
//   removeCompanion: (comp: Companion) => void;
//   companions: Companion[];
// }>({ addCompanion: () => {}, removeCompanion: () => {}, companions: [] });

// export function CompanionProvider({
//   children,
//   owner = null,
// }: {
//   owner: Companion | null;
//   children: ReactNode;
// }) {
//   const props = useCompanionManager([], owner ? owner.id : null);
//   return (
//     <CompanionContext.Provider value={{ ...props }}>
//       {children}
//     </CompanionContext.Provider>
//   );
// }
