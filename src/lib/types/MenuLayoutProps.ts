import { Dispatch, SetStateAction } from "react";

export interface MenuLayoutProps<T> {
  setActiveLayout?: Dispatch<SetStateAction<T>>;
  setMenuActive?: Dispatch<SetStateAction<boolean>>;
}
