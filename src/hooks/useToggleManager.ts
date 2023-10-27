import { useState } from "react";

export function useToggleManager(init: boolean = false) {
  const [isActive, setIsActive] = useState(init);
  const setActive = () => {
    setIsActive(true);
  };

  const setInactive = () => {
    setIsActive(false);
  };

  const toggleActive = () => {
    setIsActive((prev) => !prev);
  };
  return { isActive, setActive, setInactive, toggleActive };
}
