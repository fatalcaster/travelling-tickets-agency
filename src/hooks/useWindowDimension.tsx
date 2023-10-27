"use client";
import { useState, useEffect } from "react";

const debounce = <A extends unknown[]>(
  callback: (...args: A) => unknown,
  msDelay: number
) => {
  let timer: NodeJS.Timeout | undefined;

  return (...args: A) => {
    clearTimeout(timer);

    timer = setTimeout(() => {
      timer = undefined;
      callback(...args);
    }, msDelay);
  };
};

export const useWindowDimension = (msDelay = 100) => {
  const [dimension, setDimension] = useState({
    width: 0,
    height: 0,
  });

  useEffect(() => {
    const resizeHandler = () => {
      setDimension({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    const handler =
      msDelay <= 0 ? resizeHandler : debounce(resizeHandler, msDelay);

    window.addEventListener("resize", handler);

    return () => window.removeEventListener("resize", handler);
  }, [typeof window]);

  return dimension;
};

export type Dimension = ReturnType<typeof useWindowDimension>;
