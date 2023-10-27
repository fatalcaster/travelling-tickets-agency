import {
  MutableRefObject,
  RefObject,
  createRef,
  useEffect,
  useRef,
  useState,
} from "react";
import { useWindowDimension } from "./useWindowDimension";

export function useClickOutside<T extends HTMLElement>(onClick?: () => void) {
  const ref = useRef<T>(null);
  const handleClick = (e: MouseEvent) => {
    if (ref.current && !ref.current.contains(e.target as Node)) {
      if (onClick) onClick();
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClick, true);
    return document.removeEventListener("click", handleClick);
  }, []);

  return ref;
}

export function useBoundingClientRect<T extends HTMLElement>(
  ref: RefObject<T>
) {
  const [data, setData] = useState<DOMRect | undefined>(undefined);

  const newDimension = useWindowDimension();

  const resizeHandler = () => {
    if (!ref.current) return;
    setData(ref.current.getBoundingClientRect());
  };

  useEffect(() => {
    if (!ref.current) return;

    window.addEventListener("resize", resizeHandler);
    setData(ref.current.getBoundingClientRect());

    return window.removeEventListener("resize", resizeHandler);
  }, [ref.current, newDimension]);
  return data;
}
